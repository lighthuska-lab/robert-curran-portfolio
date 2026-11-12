# Robert Curran — Portfolio

A responsive static portfolio inspired by the technical drawing aesthetic of eknuth.dev. Content comes from Robert Curran's supplied résumé. No external fonts, trackers, runtime dependencies, or build dependencies.

## Local development

Requires Node.js 22 or newer. No install step is needed.

```sh
npm run dev
npm run check
npm run build
```

Preview at http://127.0.0.1:4173. Build output is `dist/`. Asset paths are relative so the site works under a GitHub Pages repository path.

## CI/CD

`.github/workflows/pages.yml` validates JavaScript, internal anchors, local assets, and the résumé PDF on pull requests and pushes. Only main-branch pushes or manual runs from main should publish; the GitHub Pages environment must restrict deployment to main. Build and deployment use separate jobs, with Pages/OIDC write permissions limited to deployment. No deployment secret is required.

For a new GitHub repository, push this directory as the repository root on `main`. In **Settings → Pages → Build and deployment**, select **GitHub Actions** before triggering the workflow. Restrict the `github-pages` environment to `main`. A successful deploy job reports the live URL. Repository creation and publication require authenticated GitHub access.

## Updating the site

- Content: `index.html`
- Visual design and mobile layout: `styles.css`
- Copy-email interaction: `app.js`
- Résumé download: `robert-curran-resume.pdf`

The full résumé is downloadable, including the contact details in the original PDF. The site itself shows email and city. No GitHub or LinkedIn identity is invented.

The supplied résumé lists the overall Staff role ending October 2026, while its HyperPod subsection ends December 2026. The public timeline uses the overall role dates and omits conflicting subsection dates.
