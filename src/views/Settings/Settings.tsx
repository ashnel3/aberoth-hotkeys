import React, { ReactElement, useEffect } from 'react'
import { Close, SideNav } from '../../components'

// Assets
import './settings.scss'

/** Settings main component */
export const Settings = (): ReactElement => {
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

  return (
    <div className="settings">
      <Close />
      <SideNav>
        {/** TODO: Bindings drawer sub-menu */}
        <li className="link">Bindings</li>
        <li className="link">Options</li>
      </SideNav>
      <span>settings</span>
    </div>
  )
}
