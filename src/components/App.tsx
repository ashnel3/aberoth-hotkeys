import React, { ReactElement, useEffect, useState } from 'react'
import { ThemeProvider } from 'react-jss'
import { HashRouter, Route, useHistory } from 'react-router-dom'
import { History } from 'history'
import { About, Settings, Home } from '../views'
import createTheme from '../theme'

// TODO: Better way to get history?

let history: History | undefined

/**
 * Redirect react-router
 * @param path
 */
export const SetRoute = (path: string) => {
  if (typeof history !== 'undefined') {
    window.Properties.Ready = false
    history.push(path)
  } else {
    throw new Error()
  }
}

/**
 * Get current location
 * @returns History location
 */
export const GetRoute = (): string => {
  if (typeof history !== 'undefined') {
    return history.location.pathname
  } else {
    throw new Error()
  }
}

/** Redirection component *(it's a hack but it works)* */
export const Redirecter = (): ReactElement => {
  const h = useHistory()
  history = h

  return <div className="redirecter"></div>
}

/** Main component */
export const App = (): ReactElement => {
  const [theme, setTheme] = useState<any>(null)

  useEffect(() => {
    createTheme()
      .then((theme) => setTheme(theme))
      .catch((error) => {
        throw error
      })
  }, [])

  if (theme === null) {
    return <span>Loading themes...</span>
  }

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Redirecter />
        <Route component={Home} exact path="/" />
        <Route component={About} path="/about" />
        <Route component={Settings} path="/settings" />
      </HashRouter>
    </ThemeProvider>
  )
}
