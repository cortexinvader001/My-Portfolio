# Cortex portfolio — Kolawole Suleiman

Next.js (App Router) static site with GSAP and React Bits motion.

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build      # static site in ./out

## Connect the two pending services
Edit `lib/site.config.ts`:
- `wordpress.apiBase`: your WordPress REST base, e.g. `https://yourblog.com/wp-json/wp/v2`. The blog reads posts live, newest first.
- `web3forms.accessKey`: the key from web3forms.com. Until it is set, the quote form shows a WhatsApp fallback.

## Deploy (Render Static Site)
Build command `npm ci && npm run build`, publish directory `out`, environment variable `NODE_VERSION=22`.

## Licence
React Bits components in `components/reactbits/` are MIT + Commons Clause. Client sites may use them. Do not sell this site or its React Bits components as a template or kit. See `components/reactbits/REACTBITS_LICENSE.md`.
