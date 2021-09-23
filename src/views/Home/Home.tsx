import React, { ReactElement, useEffect } from 'react'
import { Close, SideNav } from '../../components'
import './home.scss'

/** Home view component */
export const Home = (): ReactElement => {
  useEffect(() => {
    window.ahk.Gui('+Resize -AlwaysOnTop -Owner')
    window.Properties = {
      Ready: true,
      Dimensions: {
        w: 800,
        h: 600
      }
    }
  }, [])

  return (
    <div className="home">
      <div className="home-container">
        <Close />
        <SideNav>
          <li className="link">News</li>
          <li className="link">Glows</li>
          <hr />
          <li className="link">Clock</li>
          <li className="link">Wiki</li>
          <footer>
            <ul>
              <li className="link">About</li>
              <li>&bull;</li>
              <li className="link">Settings</li>
              <li>&bull;</li>
              <li className="link">Donate</li>
            </ul>
          </footer>
        </SideNav>
        <div className="feed">
          <span>home page!</span>
        </div>
      </div>
    </div>
  )
}
