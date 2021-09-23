import React, { ReactElement } from 'react'
import './about-footer.scss'

/** About view footer */
export const AboutFooter = (): ReactElement => {
  return (
    <footer className="about-footer">
      <ul>
        <li className="link" onClick={() => { window.ahk.OpenURL(window.ahk.GetMeta('homepage'), true) }}>github</li>
        <li>&bull;</li>
        <li className="link" onClick={() => { window.ahk.OpenURL(window.ahk.GetMeta('issues'), true) }}>issues</li>
        <li>&bull;</li>
        <li className="link" onClick={() => { window.ahk.OpenURL(window.ahk.GetMeta("donations"), true) }}>donate</li>
      </ul>
    </footer>
  )
}
