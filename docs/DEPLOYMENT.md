# KODYRA deployment guide

## GitHub Pages: automatic, free, secretless

The workflow `.github/workflows/pages.yml` builds, tests, and publishes only the site assets to `gh-pages` whenever `main` changes.

**One-time setup for the repository owner:**

1. Open [Settings → Pages](https://github.com/Elghouali/kodyra-website/settings/pages).
2. Under **Build and deployment** select **Deploy from a branch**.
3. Select `gh-pages`, folder `/(root)`, and Save.
4. Wait for the Pages deployment to finish, then check `https://elghouali.github.io/kodyra-website/`.

The publish job uses GitHub's built-in `GITHUB_TOKEN` with `contents: write`; no paid plan, external provider token or secret is needed. If it cannot push, check **Settings → Actions → General → Workflow permissions**.

## Existing Cloudflare Workers site

`https://kodyra-studio.elghoualizakariae.workers.dev/` remains independently hosted on Cloudflare. GitHub commits do not automatically deploy there: Cloudflare's connected Git repository currently reports a disconnected Git account.

**Do not put Cloudflare API keys in this repository.** When Cloudflare Git integration becomes available, configure the Worker build explicitly and validate a new deployment before retiring any existing URL.

## Publish verification

- Inspect [Actions](https://github.com/Elghouali/kodyra-website/actions): both workflows should pass on `main`.
- Inspect the `gh-pages` branch: only deployable site files should be present.
- Verify the English/French language switch, two browser demos, FleetOps external link and the project inquiry email draft on mobile and desktop.
- The contact form opens an email draft. It does not send a message or capture lead data on a server.
- The examples use fictional data. Do not imply they are paid client projects.

For rollback, revert the source commit on `main` and allow the publishing workflow to republish the previous version.
