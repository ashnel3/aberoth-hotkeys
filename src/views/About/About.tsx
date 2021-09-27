import React, { ReactElement, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { AboutFooter, Meta } from './components'
import { Close } from '../../components'
import { AberothHotkeysTheme } from '../../types'

// Assets
import Logo from '../../assets/aberoth-hotkeys.svg'

/** About view component */
export const About = (): ReactElement => {
  const useStyles = createUseStyles((theme: AberothHotkeysTheme) => ({
    '.root': {
      height: '252px',
      padding: '0 30px',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: theme.palette.background100,
    },

    '.content': {
      height: '100%',
      minWidth: '480px',
      float: 'left',

      '& h3': {
        color: theme.palette.title,
        marginLeft: '30px',
      }
    },

    '.logo': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',

      '& img': {
        cursor: 'pointer',
        userSelect: 'none',
      }
    }
  }))

  useEffect(() => {
    window.ahk.Gui('-Resize +AlwaysOnTop +Owner')
    window.Properties = {
      Ready: true,
      Dimensions: {
        w: 680,
        h: 300
      }
    }
  }, [])

  const styles = useStyles()

  return (
    <div className={styles['.root']}>
      <div className={styles['.logo']}>
        <img src={Logo} alt="aberoth-hotkeys logo" onClick={() => { window.ahk.OpenURL(window.ahk.GetMeta('homepage'), true) }} />
      </div>
      <div className={styles['.content']}>
        <h3>aberoth-hotkeys</h3>
        <Meta />
      </div>
      <AboutFooter />
      <Close />
    </div>
  )
}
