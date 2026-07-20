# EO Houston chapter site

Static multi-page site for the EO Houston chapter. No build step, no framework - plain HTML/CSS/JS served by Vercel.

## Session workflow - handle git for the user

Most people editing this repo are non-technical; they open Claude Code, describe a change, and expect it live. You own the entire git lifecycle:

1. **Start of session, before any edit:** `git pull --rebase origin main` so you're editing the latest version (others edit this repo too). If there are uncommitted local changes from a previous session, tell the user in plain words and ask whether to publish or discard them before continuing.
2. **After completing each requested change:** commit with a short clear message and push to main right away - publishing is part of the task, don't ask first. Then tell the user: the change goes live at https://eohouston-site.vercel.app in about a minute, refresh to see it.
3. If the push is rejected, `git pull --rebase` and push again. If authentication fails, tell them to open GitHub Desktop and sign in once, then ask you to retry.
4. Speak plainly - say "publish" and "get the latest version," not jargon. Never ask the user to run commands themselves.
5. This repo is PUBLIC. Never commit secrets, member/applicant data, or internal documents, and keep commit messages to what changed. If the user asks to add something like that, warn them and don't commit it.

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
- Every page's `<head>` carries the Google Analytics gtag snippet (G-9M5D1F3XQ4), inserted just before `</head>`. When creating a new page, copy an existing page so it comes along; don't remove it.

## Related site

The Momentum program site (eomomentum.com) is a SEPARATE repo/Vercel project. This site links out to it from index/join/about and from the nav in `shared.js`.

## Copy conventions

- No em dashes in site copy; use a hyphen, comma, or new sentence.
- Voice: direct, plain, confident. No exclamation-mark hype.
