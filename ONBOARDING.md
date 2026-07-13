# EO Houston websites - collaborator guide

You have (or are about to get) write access to the two repos that run our websites:

| Repo | Site | What it is |
|---|---|---|
| `giantseaturtle/eohouston-momentum` | [eomomentum.com](https://eomomentum.com) | Momentum program site, single page |
| `giantseaturtle/eohouston` | [eohouston-site.vercel.app](https://eohouston-site.vercel.app) | EO Houston chapter site, multi-page |

Both are plain HTML/CSS/JS - no framework, no build step. **Pushing to `main` deploys the live site.** That's the whole pipeline: you don't need a Vercel account, a dashboard, or any credentials beyond GitHub.

## One-time setup

1. Accept the GitHub invites (check your email or github.com/notifications).
2. Clone both repos:
   ```bash
   git clone https://github.com/giantseaturtle/eohouston-momentum.git
   git clone https://github.com/giantseaturtle/eohouston.git
   ```
3. Make sure your git identity is set and matches your GitHub account, so commits and deploys are attributed to you:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "the-email-on-your-github-account@example.com"
   ```

## Making changes with Claude Code

Each repo has a `CLAUDE.md` that briefs Claude on the site's layout, deploy rules, and copy conventions - so you can just describe what you want:

```bash
cd eohouston-momentum
claude
> update the webinar date to August 12 at 10:30 AM and swap in this zoom link: ...
```

Things worth knowing (Claude knows them too, from CLAUDE.md):

- **The webinar link lives in TWO places** in the Momentum site's `index.html` (hero banner + admissions section). Both the link and the visible date text need updating together.
- The chapter site's header/nav/footer are injected by `shared.js` - edit once, applies to every page.
- `momentum-email*.html` are email drafts, not site pages. They don't deploy.
- Copy style: no em dashes, times in Central (CT), plain confident voice.

## How deploys work

- **`main` is production.** `git push` to main and the live site updates in about a minute. Verify by loading the site after you push.
- **Any other branch gets a free preview URL** - the Vercel bot posts it on the commit or pull request. For anything visual or risky, push a branch first, check the preview, then merge to main.
- Never deploy with the Vercel CLI. Git is the only deploy path.
- Every deploy is kept forever and can be rolled back, and git history covers the content - honest mistakes are recoverable, so don't be afraid to ship.

## What must never go in these repos

**Both repos are publicly readable.** Treat every commit - files, commit messages, branch names - like it's being posted on the website itself, because effectively it is.

Never commit:

- Passwords, API keys, tokens, `.env` files, or credentials of any kind. These sites need none; if a task ever seems to require one, stop and ask Robert instead of committing it.
- Member or applicant data: names with contact info, emails, phone numbers, applications, spreadsheet exports.
- Internal EO material: financials, meeting notes, vendor contracts, member lists.
- Unannounced dates, pricing, or partnerships before they're public.

If something sensitive lands in a commit by accident, **do not just delete it in a follow-up commit** - git history keeps the old version and it stays public. Tell Robert immediately so the history can be scrubbed properly.

## Questions

Robert De Los Santos - robert@skyhighpartyrentals.com
