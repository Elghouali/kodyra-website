# KODYRA deployment runbook

## Hosting

Production: **Cloudflare Workers**, at:
`https://kodyra-studio.elghoualizakariae.workers.dev/`.

The agency site is a business website. GitHub Pages is **not** the recommended host: GitHub's terms restrict using Pages as free hosting for an online business (https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#pages).

## GitHub Actions -> Cloudflare Workers

Two workflows are configured:

- `.github/workflows/ci.yml`: run source checks, tests and static build; upload a ZIP-able artifact
- `.github/workflows/cloudflare.yml`: validate, build, package a self-contained Cloudflare Worker, smoke-test that Worker, and **deploy when the required GitHub repository secrets exist**

For automatic deployment, the repository owner must configure two **GitHub Actions repository secrets** under **Settings > Secrets and variables > Actions**:

| Name | Description |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Least-privileged Cloudflare API token with Workers Scripts edit permission on the target Cloudflare account |
| `CLOUDFLARE_ACCOUNT_ID` | Target account identifier (store as an Actions secret for consistency) |

Create the API token using Cloudflare's approved token management flow, never from a link sent by a stranger. **Never put it in Git history, workflow YAML, an issue or chat.**

If either secret is not configured, the job still validates and packages the website but records **deployment skipped** in its GitHub Actions job summary. It does not claim that Cloudflare was updated.

Once both secrets are configured, every push to `main` runs tests then uploads the resulting Worker script to the existing `kodyra-studio` Worker using Cloudflare's authenticated REST API. A successful API response is checked for `success: true`. The existing `workers.dev` URL remains unchanged.

Cloudflare Git-based Builds could provide a more integrated solution when the external Git connection is repaired; it currently reports the Git account as disconnected.

## Manual plugin deployment

The Cloudflare plugin can independently update the Worker with the same verified generated script without requiring dashboard access. This is how the initial site was launched. Such updates are **manual** until the GitHub Actions secrets are configured.

## Rollback and verification

- Revert a source commit on `main` and let the Cloudflare deploy workflow republish the previous release (once credentials are configured).
- Run `npm run check && npm test && npm run build && node scripts/build-worker.mjs && node scripts/smoke-worker.mjs`.
- Confirm desktop/mobile layout, EN/FR switch, data cleaning demo, quote demo, external FleetOps link and email draft.
- Contact forms are **mailto drafts**, not server-side submissions; demo metrics are fictional.

## Security

No secrets belong in GitHub source or test fixtures. Use a scoped token and rotate it if exposed. Test changes in CI before deploying the live Worker; no paid domain is required.
