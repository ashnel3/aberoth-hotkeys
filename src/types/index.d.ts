import { Meta, Options } from './config'

declare global {
  export interface Window {
    Properties: {
      Ready: boolean
      Dimensions: {
        w: number
        h: number
      }
    }

    /** Get active route */
    GetRoute(): string

    /** Redirect router */
    SetRoute(path: string): void

    /** Triggered when app is hidden */
    Hidden(): void

    /** Triggered when app is shown */
    Shown(): void

    ahk: {
      /**
       * Get configuration
       * @param value
       * @returns Option
       */
      GetOption(value: keyof Options): any

      /**
       * Update configuration
       * @param value
       * @param data
       */
      SetOption(value: keyof Options, data: any): void

      /**
       * Get meta-data
       * @param value
       * @returns Meta-data
       */
      GetMeta(value: keyof Meta): string

      /**
       * Apply gui options
       * @param options Gui options
       */
      Gui(options: string): void

      /**
       * Open url in the default browser
       * @param url
       * @param hide
       */
      OpenURL(url: string, hide?: boolean): void

      /** Hide window */
      Hide(): void

      /**
       * Show window
       * @param route Route *(Leave empty to update styles)*
       * @param styles Window styles
       */
      Show(route: string, styles: string): void

      /** Maximize window */
      Maximize(): void

      /** Minimize window */
      Minimize(): void
    }
  }
}

export { Bindings, Options, Meta } from './config'
export { AberothHotkeysTheme, BasicColors, Colors, FunctionalColors, Palette, Typography } from './theme'
