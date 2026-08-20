# Templates

Starting points for new notes. Copy one into `docs/` and fill it in.

| Template | Use for | Goes in |
| --- | --- | --- |
| `knowledge.md` | Something you are learning | `docs/ai/...`, `docs/software-engineering/...` |
| `experiment.md` | Something you tried | `docs/experiments/` |
| `project.md` | Ongoing work | `docs/projects/` |
| `journal.md` | A daily entry | `docs/journal/<year>/<month>/` |

## Frontmatter

Only `title` really matters — it is what the sidebar shows. Everything else is
convention, useful for search and for the Phase 2 features (tags, filtering,
status) if they ever get built.

| Field | Purpose |
| --- | --- |
| `title` | Sidebar label and page title |
| `description` | Shown in search results and meta tags |
| `domain` | Top-level domain the note belongs to |
| `category` | Grouping within the domain |
| `order` | Sidebar position, ascending. Omit to sort alphabetically |
| `tags` | Free-form keywords |
| `status` | `learning`, `practiced`, `understood`, `mastered`, `revisit` |
| `created` / `updated` | Dates, `YYYY-MM-DD` |

::: warning Quote a date used as a title
YAML reads a bare `2026-08-19` as a date, not text. A journal entry needs
`title: '2026-08-19'` with quotes, or the sidebar label comes out blank.
Only `title` is affected - `created` and `updated` are fine unquoted.
:::

## Copying one

```bash
cp templates/knowledge.md docs/ai/agents/supervision.md
```

Then edit the frontmatter and write. The sidebar picks it up on save.
