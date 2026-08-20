# BaseBox

**Learn. Build. Document.**

Your personal engineering knowledge base.

Markdown files are the source of truth. This repository is a folder of notes
plus a small amount of [VitePress](https://vitepress.dev) configuration that
renders them as a fast static website.

## Run locally

```bash
npm install
npm run dev
```

The dev server starts on <http://localhost:5173> with hot reload.

## Add a note

```bash
cp templates/knowledge.md docs/ai/agents/supervision.md
```

Set `title` in the frontmatter, write the note, save. The sidebar picks it up
automatically — no configuration to edit.

```bash
git add docs/ai/agents/supervision.md
git commit -m "Add note on agent supervision"
git push
```

## Build

```bash
npm run build      # output: docs/.vitepress/dist
npm run preview    # serve the built site locally
npm run typecheck  # check the TypeScript under .vitepress
```

## Structure

```text
docs/
├── .vitepress/
│   ├── config.ts        # site config
│   ├── domains.ts       # the domain registry - add domains here
│   ├── nav.ts           # top nav, derived from domains
│   ├── sidebar.ts       # sidebar, generated from the filesystem
│   └── theme/           # palette and typography only
├── index.md             # homepage
├── ai/
├── software-engineering/
├── tools/
├── experiments/
├── projects/
└── journal/<year>/<month>/
templates/               # note templates, not published
```

## Add a domain

1. Add an entry to `docs/.vitepress/domains.ts`.
2. Create `docs/<dir>/index.md`.

Navigation and sidebar follow automatically.

## Deployment

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. Set **Settings → Pages → Source** to
**GitHub Actions** once, and the loop closes:

```text
write a note → commit → push → live
```

Any static host works equally well — point it at `docs/.vitepress/dist`.
