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

## Legacy redirects

`vercel.json` carries 107 permanent (301/308) redirect rules mapping ~133 dead URLs from the site's pre-2026 history (old WordPress blog posts, an events-calendar plugin, old nav pages) to their closest current equivalent, so old backlinks/bookmarks pass their SEO value through instead of 404ing. Two wildcard rules (`/event/:slug+` and `/events/:slug+`, both -> `/events`) catch the old per-event pages; everything else is an exact-match rule, mostly landing on `/`, `/join`, `/about`, or `/partners` depending on the old page's topic. `/eo-accelerator` -> `https://eomomentum.com` since that's the old name for what's now the separate Momentum program site.

`/join` was renamed to `/membership` (Aug 2026). That rule is written as `statusCode: 301` rather than `permanent: true`, because `permanent: true` emits a **308**, not a 301 - if someone asks for a literal 301, use `statusCode`. Every legacy rule that used to point at `/join` was repointed straight at `/membership` so old backlinks resolve in ONE hop instead of chaining through the rename (redirect chains split the SEO signal - see the direct-links rule).

Gotcha that cost real debugging time: `trailingSlash: false` strips a trailing slash BEFORE any custom redirect rule gets a chance to match, so every `source` here has to be written without one (a source ending in `/` never fires - Vercel's own normalization always wins that race). `cleanUrls: true` behaves the same way for extensions: a `source` ending in `.html` never fires either, because Vercel has already rewritten `/foo.html` to `/foo` by then. So `/join.html` reaches `/membership` as a two-hop chain (`/join.html` -> `/join` -> `/membership`) and there is no rule you can add to shorten it. Don't bother adding `.html` sources; they are dead config. Also, a wildcard segment written as `:slug*` (zero-or-more) matches the bare parent path too - `/events/:slug*` -> `/events` self-redirect-looped the real `/events` page in testing. Use `:slug+` (one-or-more) for any wildcard whose destination is the parent page itself.

New dead link discovered later? Add one more exact-match entry to the `redirects` array, destination = whatever current page covers that topic closest.

## 404 page

`404.html` at the repo root is Vercel's automatic fallback for any unmatched path on a static (no-framework) deployment - no routing config needed, and the real 404 status code is preserved. It's branded (shared header/footer, links back to Home/Events/Join) instead of Vercel's bare "NOT_FOUND" page, and fires a `page_not_found` GA4 event with `path` and `referrer` params so ongoing dead-link traffic shows up in GA4 going forward.

There are TWO ways to see 404s, not one. `vercel logs` is genuinely empty (no functions on a static deploy, so there is no runtime log stream) - but that is a limit of the CLI, NOT of the data. A **log drain is configured on this project** (`logtail_eohouston_site_2550542`, sources include `static`) streaming every request to Better Stack. Query it as ClickHouse table `t507467_eohouston_site` at `https://eu-nbg-2-connect.betterstackdata.com` with the creds in `~/Desktop/SHPR Cache Generator/betterstack/download_betterstack_logs.py` - use `remote(t507467_eohouston_site_logs)` for recent and `s3Cluster(primary, t507467_eohouston_site_s3)` for archive, same query shape as that script. So: GA4 for 404s that rendered the branded page, Better Stack for the raw request log including bots and non-HTML paths.

Note Vercel Web Analytics is ENABLED in project settings but `@vercel/analytics` is not on the pages, so `/_vercel/insights/script.js` 404s and it collects nothing. Either install it or ignore that panel; do not read it as "no traffic". A one-time historical audit of dead links (from Wayback Machine history, ~130 of them, mostly the old WordPress blog and events-calendar plugin) was done separately and isn't tracked in this repo.

## Analytics

`shared.js` has one delegated click listener (added after the header/footer are injected, so it covers header/footer/mobile-nav buttons automatically) that fires a `cta_click` GA4 event for every click on a `.btn`-styled element or the Member Login link, with `link_text`, `link_url`, and `page` (from `data-page`, or the pathname on pages that don't set it) as params. New buttons on any page are tracked automatically just by using the `.btn` class - no per-button wiring needed.

On top of that generic event, a few of the highest-value destinations also fire their own named event so Robert can build a funnel/report without filtering by link text:
- `join_click` - any link to `/join` or to `member.eonetwork.org/why-join` (EO's own membership application)
- `refer_click` - the `/refer` link
- `momentum_click` - any link to eomomentum.com
- `member_login_click` - the chapterpro Member Login link
- `join_form_submit` - fires on `thanks.html` load. That page is only reachable via the join.html contact form's `formsubmit.co` `_next` redirect, so a pageview there means that form was submitted successfully (there's no reliable client-side "submit succeeded" hook for a plain HTML POST to a third party, so the destination page is the signal).
- `refer_copy_email_click` - fires from `refer.html`'s own inline script, inside `flash()`, so it only counts an actual successful copy (clipboard API or the execCommand fallback), not a copy attempt that errored.

If a new CTA rule is needed, add a `[regex, 'event_name']` pair to `CTA_EVENT_RULES` in `shared.js`.

## Related site

The Momentum program site (eomomentum.com) is a SEPARATE repo/Vercel project. This site links out to it from index/join/about and from the nav in `shared.js`.

## Copy conventions

- No em dashes in site copy; use a hyphen, comma, or new sentence.
- Voice: direct, plain, confident. No exclamation-mark hype.
