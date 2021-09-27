import React, { ReactElement, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { Close, SideNav } from '../../components'
import { AberothHotkeysTheme } from '../../types'

/** Home view component */
export const Home = (): ReactElement => {
  const useStyles = createUseStyles((theme: AberothHotkeysTheme) => ({
    '.root': {
      position: 'absolute',
      height: '100%',
      width: '100%',
      background: theme.palette.background100,
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
        w: 800,
        h: 600
      }
    }
  }, [])

  const styles = useStyles()
  return (
    <div className={styles['.root']}>
      <div className={styles['.container']}>
        <Close />
        <SideNav width={260}>
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
