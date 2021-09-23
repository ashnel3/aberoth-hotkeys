import React, { ReactElement } from 'react'
import { HashRouter, Route, useHistory } from 'react-router-dom'
import { History } from 'history'
import { About, Settings, Home } from '../views'

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
  return (
    <HashRouter>
      <Redirecter />
      <Route component={Home} exact path="/" />
      <Route component={About} path="/about" />
      <Route component={Settings} path="/settings" />
    </HashRouter>
  )
}
