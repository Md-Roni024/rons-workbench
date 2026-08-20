import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

/**
 * BaseBox uses the stock VitePress default theme. The only customisation is a
 * stylesheet that adjusts the palette and typography for long technical
 * reading. No custom components.
 */
export default {
  extends: DefaultTheme,
} satisfies Theme
