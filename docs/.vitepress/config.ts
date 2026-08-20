import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { buildNav } from './nav'
import { buildSidebar } from './sidebar'

/**
 * BaseBox — Learn. Build. Document.
 *
 * The navigation and sidebar are generated (see `domains.ts`, `nav.ts` and
 * `sidebar.ts`), so day-to-day note-taking never requires touching config.
 */
export default withMermaid(
  defineConfig({
    title: "Ron's WorkBench",
    description: 'Your personal engineering knowledge base.',
    lang: 'en-GB',

    // Emit `/ai/llm/tokens.html` as `/ai/llm/tokens/index.html` so URLs stay
    // clean on any static host.
    cleanUrls: true,

    // A dead internal link should fail the build, not ship broken.
    ignoreDeadLinks: false,

    lastUpdated: true,

    head: [
      ['link', { rel: 'icon', href: '/letter-r.svg', type: 'image/svg+xml' }],
      ['meta', { name: 'theme-color', content: '#3a7ca5' }],
    ],

    vite: {
      plugins: [
        {
          /*
           * `sidebar` below is evaluated once, when this config is loaded, so
           * a newly created Markdown file would not appear in the navigation
           * until the dev server was restarted by hand. Vite restarts on
           * config changes but not on content changes, so watch for pages
           * being added, removed or renamed and restart for them too.
           *
           * Edits to an existing page do not need this - VitePress hot-reloads
           * page content on its own.
           */
          name: 'basebox:rebuild-sidebar-on-new-page',
          configureServer(server) {
            // VitePress bundles this config into a temp .mjs before running
            // it, so `import.meta.url` points at that temp file. Resolve the
            // real source path instead - npm scripts run from the repo root.
            const configFile = path.resolve(
              process.cwd(),
              'docs/.vitepress/config.ts',
            )
            let pending: NodeJS.Timeout | undefined

            const rebuild = (file: string) => {
              if (!file.endsWith('.md') || !fs.existsSync(configFile)) return
              // Touching this config marks it stale, and VitePress reloads it
              // through its own restart path. Calling `server.restart()`
              // directly does not survive the Mermaid config wrapper.
              clearTimeout(pending)
              pending = setTimeout(() => {
                const now = new Date()
                fs.utimesSync(configFile, now, now)
              }, 150)
            }

            server.watcher.on('add', rebuild)
            server.watcher.on('unlink', rebuild)
          },
        },
      ],
    },

    markdown: {
      lineNumbers: true,
      // Show the language on each code block, which helps when a page mixes
      // Bash, PowerShell and TypeScript.
      codeCopyButtonTitle: 'Copy code',
    },

    themeConfig: {
      siteTitle: "Ron's WorkBench",

      nav: buildNav(),
      sidebar: buildSidebar(),

      outline: { level: [2, 3], label: 'On this page' },

      search: {
        provider: 'local',
        options: {
          detailedView: true,
        },
      },

      docFooter: { prev: 'Previous', next: 'Next' },

      lastUpdated: {
        text: 'Updated',
        formatOptions: { dateStyle: 'medium', timeStyle: undefined },
      },

      footer: {
        message: 'Learn. Build. Document.',
        copyright: "Ron's WorkBench — a personal engineering knowledge base.",
      },
    },
  }),
)
