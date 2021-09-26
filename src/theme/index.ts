import fontsize from './fontsize'
import spacing from './spacing'
import palette from './palette'
import typography from './typography'
import { AberothHotkeysTheme } from "../types/theme"


// TODO: Load json themes?
const loadThemePlugins = async (): Promise<Partial<AberothHotkeysTheme>> => ({})

/** Create app theme */
const createTheme = async (): Promise<AberothHotkeysTheme> => {
  const custom = await loadThemePlugins()
  const theme = {
    palette,
    fontsize,
    spacing,
    typography,
    ...custom
  }
  return theme
}
export default createTheme
