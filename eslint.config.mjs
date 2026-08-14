import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    // Native anchors intentionally avoid shipping the client router on this
    // mostly-static booking site; the contact form remains the only client island.
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    ".claude/**",
    "design_handoff_gnf_redesign/**",
  ]),
]);
