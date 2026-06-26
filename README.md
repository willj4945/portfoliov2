# Will Johnson — Portfolio

Personal portfolio and GitHub Pages site for Will Johnson — Cybersecurity GRC & Automation Engineer.

**Live site:** https://willj4945.github.io/portfoliov2/

## About

Static HTML/CSS/JS portfolio showcasing work in cybersecurity GRC, compliance automation, cloud security, and DevSecOps. No build tools or frameworks — hand-crafted HTML, CSS, and vanilla JavaScript.

## Project Structure

```
portfoliov2/
├── index.html                        # Main page (intro, projects, contact)
├── about.html                        # About page
├── styles.css                        # All styles (CSS custom properties, responsive layout)
├── script.js                         # Theme toggle and mobile nav
├── resume.pdf                        # Downloadable resume
├── favicon.svg                       # Site favicon
├── images/                           # Project screenshots and assets
└── .github/
    └── workflows/
        └── static.yml                # GitHub Actions — validate + deploy pipeline
```

## Local Development

No build step required. Open `index.html` in a browser, or serve locally with any static HTTP server to avoid CORS quirks:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx, no install needed)
npx serve .
```

Then open `http://localhost:8080`.

## Deployment

The site deploys automatically to GitHub Pages on every push to `master`. The pipeline runs two jobs:

1. **validate** — runs `htmlhint` against all HTML files; deploy is blocked if validation fails
2. **deploy** — uploads the site artifact and deploys via the official GitHub Pages actions

See [`.github/workflows/static.yml`](.github/workflows/static.yml) for the full configuration.

Deployment requires GitHub Pages to be enabled in repository **Settings → Pages → Source: GitHub Actions**.

## Security Notes

| Area | Status | Notes |
|---|---|---|
| HTTPS | Enforced | GitHub Pages forces HTTPS automatically |
| External scripts | Review on change | Font Awesome Kit and Google Analytics load from CDN — audit any new third-party additions |
| Static surface | Low risk | No server-side code; attack surface is limited to static files and CDN dependencies |
| Resume | Public | `resume.pdf` is publicly accessible — confirm the committed version only contains info intended for public sharing |
| Secrets | None committed | No API keys or credentials in this repo; `.gitignore` covers common secret file patterns |

### Content Security Policy

GitHub Pages does not support custom HTTP response headers. If you want CSP enforcement, add a `<meta>` tag to each HTML file:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' https://kit.fontawesome.com https://www.googletagmanager.com 'unsafe-inline';
               style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
               font-src https://fonts.gstatic.com https://ka-f.fontawesome.com;
               img-src 'self' data:;
               connect-src https://ka-f.fontawesome.com;">
```

Adjust the directives if you add new CDN dependencies.

## Technologies

- HTML5 / CSS3 — custom properties, flexbox, responsive layout
- Vanilla JavaScript — theme toggle, mobile nav
- [Font Awesome](https://fontawesome.com/) — icons (Kit CDN)
- [Google Fonts](https://fonts.google.com/) — Inter, Fira Mono
- GitHub Actions + GitHub Pages — CI/CD and hosting
