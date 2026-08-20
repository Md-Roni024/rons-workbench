/**
 * The BaseBox domain registry.
 *
 * This is the ONE place that defines which knowledge domains exist.
 * To add a domain (e.g. "Backend", "Database"), add an entry here and
 * create the matching `docs/<dir>/` folder with an `index.md`.
 *
 * Nothing else in the config needs to change: the top navigation and the
 * sidebar are both derived from this list.
 */
export interface Domain {
  /** Directory name under `docs/`, and the first URL segment. */
  dir: string
  /** Human-readable label. Used for the sidebar heading and homepage card. */
  text: string
  /**
   * Shorter label for the top navigation bar, where horizontal space is
   * tight on tablet-width screens. Falls back to `text`.
   */
  navText?: string
  /** Short description, used on the homepage cards. */
  description: string
  /** Show in the top navigation bar. */
  inNav?: boolean
}

export const domains: Domain[] = [
  {
    dir: 'ai',
    text: 'AI',
    description: 'LLMs, agents, RAG, MCP and the practice of AI engineering.',
  },
  {
    dir: 'software-engineering',
    text: 'Software Engineering',
    navText: 'Engineering',
    description: 'Architecture, design patterns, system design and programming.',
  },
  {
    dir: 'tools',
    text: 'Tools',
    description: 'The tools I actually use, and how I use them.',
  },
  {
    dir: 'experiments',
    text: 'Experiments',
    description: 'Things I tried, what worked, and what did not.',
  },
  {
    dir: 'projects',
    text: 'Projects',
    description: 'Ongoing work, decisions and open questions.',
  },
  {
    dir: 'journal',
    text: 'Journal',
    description: 'Short daily records of what I learned.',
  },
]
