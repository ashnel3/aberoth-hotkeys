import React, { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'

/** Floating close button */
export const Close = (): ReactElement => {
  const useStyles = createUseStyles((theme) => ({
    '.close': {
      position: 'fixed',
      width: '18px',
      height: '18px',
      margin: '12px',
      top: 0,
      right: 0,
      border: '1px solid darkgrey',
      borderRadius: 999,
      cursor: 'pointer',
      textAlign: 'center',
      zIndex: 999,
      transition: 'background-color 0.15s ease',

      '& span': {
        color: 'darkgrey',
        fontSize: '14px',
        fontWeight: 'bold',
      }

      // '&:hover': {}
    }
  }))

  const styles = useStyles()

  return (
    <div className={styles['.close']} onClick={() => { window.ahk.Hide() }}>
      <span>&times;</span>
    </div>
  )
}
