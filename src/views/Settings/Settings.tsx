import React, { ReactElement, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { Close, SideNav } from '../../components'

/** Settings main component */
export const Settings = (): ReactElement => {
  const useStyles = createUseStyles((theme) => ({
    '.settings': {
      minWidth: '120px',
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
      <SideNav width={400}>
        {/** TODO: Bindings drawer sub-menu */}
        <li className="link">Bindings</li>
        <li className="link">Options</li>
      </SideNav>
      <span>settings</span>
    </div>
  )
}
