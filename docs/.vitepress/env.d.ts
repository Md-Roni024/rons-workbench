/**
 * Vite resolves CSS side-effect imports at build time; TypeScript needs to be
 * told they exist so `import './custom.css'` typechecks.
 */
declare module '*.css' {}
