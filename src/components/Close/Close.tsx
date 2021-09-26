import React, { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import { AberothHotkeysTheme } from '../../types'

/** Floating close button */
export const Close = (): ReactElement => {
  const useStyles = createUseStyles((theme: AberothHotkeysTheme) => ({
    '.close': {
      position: 'fixed',
      width: '18px',
      height: '18px',
      margin: '12px',
      top: 0,
      right: 0,
      backgroundColor: theme.palette.background100,
      borderColor: theme.palette.background400,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: 999,
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'background-color 0.15s ease',
      zIndex: 999,

      '& span': {
        color: theme.palette.background400,
        fontSize: '14px',
        fontWeight: 'bold',
      },

      '&:hover': {
        backgroundColor: theme.palette.background,
      }
    }
  }))

  const styles = useStyles()
  return (
    <div className={styles['.close']} onClick={() => { window.ahk.Hide() }}>
      <span>&times;</span>
    </div>
  )
}
