import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { DefaultTheme } from 'vitepress'
import { domains } from './domains'

/**
 * Builds the VitePress sidebar by walking the Markdown files on disk.
 *
 * BaseBox treats Markdown files as the source of truth, so the sidebar is
 * derived from the filesystem rather than hand-maintained. Dropping a new
 * `.md` file into a domain folder is enough to make it appear.
 *
 * Ordering: `order` frontmatter (ascending) first, then title, A-Z.
 * A domain can opt into reverse ordering (the Journal does, so the newest
 * entries surface first).
 */

const DOCS_ROOT = path.resolve(__dirname, '..')

interface Entry {
  text: string
  order: number
  /** Present for files; absent for directories. */
  link?: string
  items?: Entry[]
  collapsed?: boolean
}

/** Turns `context-engineering` into `Context Engineering`. */
function humanize(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Reads the display title and sort order out of a Markdown file.
 *
 * The title must be a string. YAML parses a bare `2026-08-19` as a Date, so a
 * journal entry with an unquoted date title would otherwise produce a blank
 * sidebar label; anything non-string falls through to the heading instead.
 */
function readMeta(filePath: string): { title?: string; order?: number } {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const title =
    (typeof data.title === 'string' && data.title.trim()) ||
    // Fall back to the first level-1 heading if there is no usable title.
    content.match(/^#\s+(.+)$/m)?.[1]?.trim() ||
    undefined

  return { title, order: typeof data.order === 'number' ? data.order : undefined }
}

function sortEntries(entries: Entry[], direction: 'asc' | 'desc'): Entry[] {
  const sorted = entries.sort(
    (a, b) => a.order - b.order || a.text.localeCompare(b.text),
  )
  return direction === 'desc' ? sorted.reverse() : sorted
}

/**
 * Recursively converts a directory of Markdown into sidebar entries.
 * `index.md` is not listed as a sibling; it becomes the link for its own
 * directory group instead.
 */
function walk(absDir: string, urlPrefix: string, direction: 'asc' | 'desc'): Entry[] {
  const entries: Entry[] = []

  for (const name of fs.readdirSync(absDir)) {
    if (name.startsWith('.')) continue
    const abs = path.join(absDir, name)

    if (fs.statSync(abs).isDirectory()) {
      const children = walk(abs, `${urlPrefix}${name}/`, direction)
      const indexFile = path.join(abs, 'index.md')
      const hasIndex = fs.existsSync(indexFile)

      // Nothing to link to: no index page of its own, and no pages inside.
      if (!hasIndex && children.length === 0) continue

      const meta = hasIndex ? readMeta(indexFile) : {}
      const entry: Entry = {
        text: meta.title ?? humanize(name),
        order: meta.order ?? Number.MAX_SAFE_INTEGER,
        link: hasIndex ? `${urlPrefix}${name}/` : undefined,
      }

      // A folder whose only page is its own index reads better as a plain
      // link than as a group with nothing to expand.
      if (children.length > 0) {
        entry.items = children
        // Collapsible, but open by default - the point is to see what exists.
        entry.collapsed = false
      }

      entries.push(entry)
      continue
    }

    if (!name.endsWith('.md') || name === 'index.md') continue

    const meta = readMeta(abs)
    entries.push({
      text: meta.title ?? humanize(name.replace(/\.md$/, '')),
      order: meta.order ?? Number.MAX_SAFE_INTEGER,
      link: `${urlPrefix}${name.replace(/\.md$/, '')}`,
    })
  }

  return sortEntries(entries, direction)
}

/**
 * Produces a multi-sidebar object keyed by domain path, e.g. `/ai/`.
 * Domains without a folder on disk are skipped, so the registry can list a
 * domain before its content exists.
 */
export function buildSidebar(): DefaultTheme.Sidebar {
  const sidebar: DefaultTheme.Sidebar = {}

  for (const domain of domains) {
    const absDir = path.join(DOCS_ROOT, domain.dir)
    if (!fs.existsSync(absDir)) continue

    const direction = domain.dir === 'journal' ? 'desc' : 'asc'
    const items = walk(absDir, `/${domain.dir}/`, direction)

    sidebar[`/${domain.dir}/`] = [
      {
        text: domain.text,
        link: fs.existsSync(path.join(absDir, 'index.md'))
          ? `/${domain.dir}/`
          : undefined,
        items,
      },
    ]
  }

  return sidebar
}
