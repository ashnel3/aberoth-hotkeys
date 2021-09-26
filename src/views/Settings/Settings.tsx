import React, { ReactElement, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { Close, SideNav } from '../../components'
import { AberothHotkeysTheme } from '../../types'

/** Settings main component */
export const Settings = (): ReactElement => {
  const useStyles = createUseStyles((theme: AberothHotkeysTheme) => ({
    '.settings': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background100,
    },

    '.container': {
      marginLeft: '260px',
    }
  }))

  useEffect(() => {
    window.ahk.Gui('+Resize -AlwaysOnTop -Owner')
    window.Properties = {
      Ready: true,
      Dimensions: {
        h: 480,
        w: 640
      }
    }
  }, [])

  const styles = useStyles()

  return (
    <div className={styles['.settings']}>
      <Close />
      <SideNav width={260}>
        {/** TODO: Bindings drawer sub-menu */}
        <li className="link">Bindings</li>
        <li className="link">Options</li>
      </SideNav>
      <div className="container"></div>
    </div>
  )
}
