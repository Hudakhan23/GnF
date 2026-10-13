#!/usr/bin/env node
/**
 * Reproducible comparison of every roster portrait against the provenance
 * inventory in docs/image-rights/IMAGE-SOURCES.md.
 *
 *   npm run check:images            summary + unmatched list
 *   npm run check:images -- --csv   full per-artist table on stdout
 *
 * Matching is by exact file name (not substring). The script never changes
 * rights status — it only reports. It fails (exit 1) when the code claims
 * more than the evidence supports: an "approved" or "client-supplied" image
 * without a matching inventory line, or rights documents under /public.
 */
import fs from "node:fs";
import path from "node:path";
import { ARTISTS } from "../src/data/artists.js";
import {
  APPROVED_IMAGES,
  CLIENT_SUPPLIED_IMAGES,
  imageRightsStatus,
} from "../src/data/imageRights.js";

const ROOT = process.cwd();
const INVENTORY = path.join(ROOT, "docs/image-rights/IMAGE-SOURCES.md");
const IMAGE_FILE = /[\w.-]+\.(?:jpe?g|png|webp|avif|gif)/gi;

const lines = fs.readFileSync(INVENTORY, "utf8").split("\n");
const evidence = new Map(); // file name -> inventory lines mentioning it
lines.forEach((line, i) => {
  for (const name of line.match(IMAGE_FILE) || []) {
    const key = name.toLowerCase();
    if (!evidence.has(key)) evidence.set(key, []);
    evidence.get(key).push({ line: i + 1, text: line.trim() });
  }
});

const problems = [];
const rows = ARTISTS.map((artist) => {
  const file = artist.image ? path.basename(artist.image) : null;
  const entries = file ? evidence.get(file.toLowerCase()) || [] : [];
  const suppliedEvidence = entries.some((e) => /supplied by the user/i.test(e.text));
  const source = entries.map((e) => (e.text.match(/https?:\/\/[^\s)]+/) || [""])[0]).find(Boolean) || "";
  const status = imageRightsStatus(artist.image);
  // Name mentions are leads for a human reviewer, never treated as evidence.
  const nameMentions = file && !entries.length
    ? lines
        .map((text, i) => ({ line: i + 1, text }))
        .filter((l) => l.text.toLowerCase().includes(artist.name.toLowerCase()))
        .map((l) => l.line)
    : [];

  if (status === "approved" && !entries.length) {
    problems.push(`${artist.image}: marked approved but has no inventory entry`);
  }
  if (status === "client-supplied" && !suppliedEvidence) {
    problems.push(`${artist.image}: marked client-supplied but inventory does not say so`);
  }
  if (suppliedEvidence && status === "unverified") {
    problems.push(`${artist.image}: inventory says supplied by the client but imageRights.js does not`);
  }

  return {
    slug: artist.slug,
    name: artist.name,
    image: artist.image || "",
    status: status || "none",
    inventory: entries.length ? `lines ${entries.map((e) => e.line).join("/")}` : "NOT IN INVENTORY",
    source,
    nameMentions: nameMentions.join("/"),
  };
});

for (const set of [APPROVED_IMAGES, CLIENT_SUPPLIED_IMAGES]) {
  for (const src of set) {
    if (!ARTISTS.some((a) => a.image === src)) problems.push(`${src}: listed in imageRights.js but used by no artist`);
  }
}

const publicDocs = fs
  .readdirSync(path.join(ROOT, "public"), { recursive: true })
  .filter((f) => /(IMAGE-SOURCES|rights|licen[cs]e).*\.(md|txt|csv|json)$/i.test(String(f)));
for (const f of publicDocs) problems.push(`public/${f}: rights documentation must not be publicly served`);

if (process.argv.includes("--csv")) {
  const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const cols = ["slug", "name", "image", "status", "inventory", "source", "nameMentions"];
  console.log(cols.join(","));
  for (const r of rows) console.log(cols.map((c) => q(r[c])).join(","));
  process.exit(problems.length ? 1 : 0);
}

const withImage = rows.filter((r) => r.image);
const uniquePaths = new Set(withImage.map((r) => r.image));
const unmatched = withImage.filter((r) => r.inventory === "NOT IN INVENTORY");
const byStatus = rows.reduce((m, r) => ((m[r.status] = (m[r.status] || 0) + 1), m), {});

const missingFiles = withImage.filter((r) => !fs.existsSync(path.join(ROOT, "public", r.image)));
const approved = rows.filter((r) => r.status === "approved").length;

// Three different things — none implies the next.
console.log(`Roster artists:                        ${ARTISTS.length}`);
console.log(`1. Portrait file exists in /public:    ${withImage.length - missingFiles.length} of ${withImage.length} (${uniquePaths.size} unique paths)`);
console.log(`2. Provenance documented (inventory):  ${withImage.length - unmatched.length}  — not documented: ${unmatched.length}`);
console.log(`   of which recorded as GnF-supplied:  ${byStatus["client-supplied"] || 0} (rights still unconfirmed)`);
console.log(`3. Permission / licence confirmed:     ${approved}`);
console.log(`Rights status in code:                 ${JSON.stringify(byStatus)}`);
for (const r of missingFiles) problems.push(`${r.image}: referenced by ${r.slug} but the file is missing`);
console.log("\nPortraits with no inventory entry (rights unknown — keep unverified):");
for (const r of unmatched) {
  const lead = r.nameMentions ? `  [name mentioned on inventory line ${r.nameMentions} — check manually]` : "";
  console.log(`  ${r.image}  (${r.slug})${lead}`);
}

if (problems.length) {
  console.error(`\n${problems.length} consistency problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("\nNo approved or client-supplied claims exceed the recorded evidence.");
