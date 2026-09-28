# Sebastian Keltz Engineering Portfolio

Live site: https://sebastiankeltz.github.io/sebastian-engineering-garage/

The recruiter portfolio is built with React, TypeScript, and Vinext, then exported as static pages for GitHub Pages. It includes the updated résumé, five project case studies, education, experience, contact links, and four interactive engineering calculators.

## Edit and publish

Editable source is in `portfolio-src/`. Use Node.js 22.13 or newer.

```sh
cd portfolio-src
npm ci
npm run build
npm run check
```

`npm run build` exports every page and copies the public output into the repository root. Commit the source and generated output together, then push to `main`. GitHub Pages publishes `main` from the repository root. `.nojekyll` keeps the generated `_next` assets available.

## Hosting details

- The public base path is `/sebastian-engineering-garage`.
- `lib/site.ts` defines the public URL and asset prefix.
- `components/site-link.tsx` uses native links with directory paths so every page works on a static host.
- `scripts/prepare-pages.mjs` creates directory index pages and redirects for previous `.html` links. Existing images and other assets are preserved.
- The export uses `trailingSlash: false` because this Vinext version redirects prerender requests with `trailingSlash: true`. The preparation script provides directory URLs for GitHub Pages.
- Server bundles, local environments, and credentials are excluded from Git.

The supplied résumé still links to this same GitHub Pages address; its contents are unchanged.
