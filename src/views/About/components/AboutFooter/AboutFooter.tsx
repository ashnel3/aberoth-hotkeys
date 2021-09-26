import React, { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import { AberothHotkeysTheme } from '../../../../types'

/** About view footer */
export const AboutFooter = (): ReactElement => {
  const useStyles = createUseStyles((theme: AberothHotkeysTheme) => ({
    '.footer': {
      display: 'flex',
      position: 'absolute',
      width: '100%',
      height: '48px',
      bottom: '0',
      left: '0',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background400,
    },

    '.nav': {
      margin: '0',
      padding: '0',
      listStyle: 'none',
      textAlign: 'center',
      cursor: 'pointer',
      userSelect: 'none',

      '& li': {
        color: theme.palette.action,
        display: 'inline',
        margin: '0 4px',

        '&:hover': {
          color: theme.palette.action2,
        },
      }
    }
  }))

  const styles = useStyles()
  return (
    <footer className={styles['.footer']}>
      <ul className={styles['.nav']}>
        <li className="link" onClick={() => { window.ahk.OpenURL(window.ahk.GetMeta('homepage'), true) }}>github</li>
        <li>&bull;</li>
        <li className="link" onClick={() => { window.ahk.OpenURL(window.ahk.GetMeta('issues'), true) }}>issues</li>
        <li>&bull;</li>
        <li className="link" onClick={() => { window.ahk.OpenURL(window.ahk.GetMeta("donations"), true) }}>donate</li>
      </ul>
    </footer>
  )
}
