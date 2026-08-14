# GnF Events

Performance-first Next.js website for GnF Events, a Pakistan-based artist
facilitation and event management company.

## Routes

- `/` — cinematic home page, featured artists, services, work and trust signals
- `/artists` — complete artist roster
- `/artists/[slug]` — statically generated artist booking enquiry pages
- `/about` — company and leadership story
- `/contact` — contact details and the only client-side form
- `/sitemap.xml`, `/robots.txt` — search-engine discovery endpoints

## Architecture

- Server Components by default
- Shared UI in `src/components/`
- Artist and show content in `src/data/`
- CSS Modules and global design tokens
- `next/image` for responsive AVIF/WebP delivery and lazy loading
- CSS-only marquees and native HTML/CSS mobile navigation
- Archivo and Cormorant Garamond loaded once through `next/font`

## Development

Requires Node.js 20.9 or newer (Node 22 LTS recommended).

```bash
npm install
npm run dev
```

## Production verification

```bash
npm run build
npm start
```

The canonical production origin is configured in `src/data/site.js`.
