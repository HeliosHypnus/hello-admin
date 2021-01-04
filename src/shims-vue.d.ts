declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// declare var window: Window & { less: any };
declare global {
  interface Window {
    less: any
  }
}