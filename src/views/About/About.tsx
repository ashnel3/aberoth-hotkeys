import React, { ReactElement, useEffect } from "react"
import { Close } from '../../components'
import { AboutFooter, Meta } from './components'

// Assets
import Logo from '../../assets/aberoth-hotkeys.svg'
import './about.scss'

/** About view component */
export const About = (): ReactElement => {
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

  return (
    <div className="about">
      <Close />
      <div className="about-logo">
        <img src={Logo} alt="aberoth-hotkeys logo" onClick={() => { window.ahk.OpenURL(window.ahk.GetMeta('homepage'), true) }} />
      </div>
      <div className="about-content">
        <h3>aberoth-hotkeys</h3>
        <Meta />
      </div>
      <AboutFooter />
    </div>
  )
}
