export type BasicColors = 'red' | 'magenta' | 'purple' | 'blue' | 'lightblue' | 'cyan' | 'green' | 'lime' | 'yellow' | 'brown' | 'orange' | 'grey' | 'white' | 'black' | 'background'

export type FunctionalColors = 'action' | 'link' | 'button' | 'title' | 'subtitle' | 'body' | 'italics'

export type Colors = `${BasicColors}${'' | 100 | 200 | 300 | 400 | 500}` | `${FunctionalColors}${'' | 1 | 2}`

export type Palette = { [key in Colors]?: string }

export interface Typography {
  fontFamily: string
  fontWeight: {
    title: string
    subtitle: string
    body: string
    bold: string
    italics: string
  }
}

export interface AberothHotkeysTheme {
  palette: Palette
  fontsize: (i: number) => string
  spacing: (...values: number[]) => string
  typography: Typography
}
