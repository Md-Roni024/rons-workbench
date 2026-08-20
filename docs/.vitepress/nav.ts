import type { DefaultTheme } from 'vitepress'
import { domains } from './domains'

/**
 * The top navigation bar, derived from the domain registry so that adding a
 * domain in one place is enough.
 */
export function buildNav(): DefaultTheme.NavItem[] {
  return domains
    .filter((domain) => domain.inNav !== false)
    .map((domain) => ({
      text: domain.navText ?? domain.text,
      link: `/${domain.dir}/`,
      // Keep the item highlighted while browsing anywhere inside the domain.
      activeMatch: `^/${domain.dir}/`,
    }))
}
