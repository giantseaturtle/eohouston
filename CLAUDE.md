# EO Houston chapter site

Static multi-page site for the EO Houston chapter. No build step, no framework - plain HTML/CSS/JS served by Vercel.

## Deploy

- Vercel project `eohouston-site` deploys this repo via git integration (currently served at https://eohouston-site.vercel.app).
- Push to `main` = LIVE production deploy. Treat main as production.
- Push any other branch = preview deployment (URL posted on the commit/PR by the Vercel bot).
- Do not deploy with the Vercel CLI; git push is the deploy.
- Vercel BLOCKS deploys whose commit author can't be matched to a GitHub account. Before your first push, make sure `git config user.email` is an email verified on your GitHub profile, or the deploy silently stalls as BLOCKED.

## Layout

- One HTML file per page: `index`, `about`, `leadership`, `events`, `join`, `partners`, `refer`, `thanks`, plus the `eo-vs-*.html` comparison pages.
- `shared.js` - injects the shared header/nav/footer into every page (pages set `data-page` on `<body>`). Nav links and the EO ring mark live here; edit once, applies everywhere.
- `styles.css` - shared styles for all pages.
- `assets/` - logos, swoosh/wave decorations, icons, card and team images.
- `vercel.json` - `cleanUrls: true`, so internal links are extensionless (`/join`, not `/join.html`). Keep new links extensionless.

## Related site

The Momentum program site (eomomentum.com) is a SEPARATE repo/Vercel project. This site links out to it from index/join/about and from the nav in `shared.js`.

## Copy conventions

- No em dashes in site copy; use a hyphen, comma, or new sentence.
- Voice: direct, plain, confident. No exclamation-mark hype.
