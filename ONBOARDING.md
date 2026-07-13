# Editing the EO Houston and EO Momentum websites

*A guide for making website updates by describing what you want in plain English. No coding experience needed.*

## How this works, in one paragraph

The files for both websites live on a service called GitHub. You'll keep a copy on your computer, and when you want to change something - a date, a photo, a price, a whole section - you'll type what you want in plain English and an AI assistant called Claude makes the edit for you. Then you click two buttons to publish, and the live website updates about a minute later. Every version of the site is saved forever, so **nothing you do can permanently break anything** - any mistake can be undone in minutes.

There are two websites, and they work exactly the same way:

- **EO Momentum** (eomomentum.com) - the Momentum program page
- **EO Houston** (the chapter site)

## One-time setup (about 20 minutes)

**1. Accept the invitations.** Robert will send two GitHub invitations to your email (one per website). If you don't have a GitHub account yet, the invitation email will walk you through creating one - it's free. Click Accept on both.

**2. Install GitHub Desktop** from [desktop.github.com](https://desktop.github.com). This is a friendly app with buttons - you will never need to memorize commands. Open it and sign in with your GitHub account when it asks.

**3. Download the websites to your computer.** In GitHub Desktop: **File → Clone Repository**. You'll see a list that includes `giantseaturtle/eohouston-momentum` and `giantseaturtle/eohouston`. Pick one, click **Clone**, then repeat for the other. ("Clone" just means "download my copy.")

**4. Install Claude Code**, the AI assistant, from [claude.com/claude-code](https://claude.com/claude-code). You'll need a Claude account - the paid Claude Pro plan (about $20/month) is the practical minimum for regular use. Sign in when it asks.

That's it. You never have to do these steps again.

## Making an update (the routine)

**1. Open GitHub Desktop** and pick the website you want to edit from the "Current Repository" menu at the top left (`eohouston-momentum` for the Momentum site, `eohouston` for the chapter site).

**2. Click "Fetch origin"** at the top. This grabs any changes made since you last worked, so you're editing the latest version. (If a "Pull" button appears after, click that too.)

**3. Open the assistant.** From the menu bar: **Repository → Open in Terminal** (Mac) or **Open in Command Prompt** (Windows). A text window opens - just type `claude` and press Enter.

**4. Say what you want changed**, like you'd text a colleague:

> *"Update the webinar to Tuesday, August 12 at 10:30 AM Central, and use this new Zoom registration link: https://..."*

> *"Replace the photo of Kyle on the leadership page with the file kyle-new.jpg that I put in this folder."* (You can drag any photo into the website's folder first.)

> *"Add a new partner called Acme Insurance with this logo and link to their site."*

Claude knows these websites - where things live, the formatting rules, even quirks like the webinar link appearing in two places. It will make the edit and tell you what it did. Ask it questions if anything is unclear; ask it to show you the change; ask it to undo something. It's a conversation.

**5. Publish.** Go back to GitHub Desktop. You'll see the changed files listed. In the small box at the bottom left, type a short note about what you changed (like "new webinar date"), click **Commit to main**, then click **Push origin** at the top.

**6. Check the site.** Wait about a minute, then open the website and refresh. Your change is live.

## If something looks wrong

Don't panic - seriously, nothing is lost, ever. Two options:

- Go back to the Claude window and say what's wrong: *"the date on the top banner is still the old one, fix it"* - then publish again (step 5).
- Or just text Robert. He can restore any previous version of the site in a couple of minutes.

## The three rules

These website files are **publicly viewable** (that's normal for websites - visitors' browsers download these exact files anyway). So the only real rule is about what goes into the folder:

1. **Never put passwords, member lists, applications, financial documents, or anything internal into these website folders** - not even temporarily. The websites don't need any of that. If a task ever seems to require a password or a key of some kind, stop and ask Robert instead.
2. **The little notes you write when publishing are public too** - keep them to what changed, like "updated webinar date."
3. **If something private ends up in there by accident, tell Robert right away** - don't just delete it yourself, because old versions stay visible until it's properly removed. No judgment, it's a two-minute fix if he knows.

## Questions

Robert De Los Santos - robert@skyhighpartyrentals.com
