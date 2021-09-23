import React from 'react'
import ReactDOM from 'react-dom'
import { App, GetRoute, SetRoute} from './components/App'
import reportWebVitals from './reportWebVitals'
import { Hidden, Shown } from './globals'
import './styles/styles.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// Assigning globals, dont hurt me :(
window.Properties = {
  Ready: false,
  Dimensions: {
    h: 480,
    w: 640
  }
}
window.Hidden = Hidden
window.Shown = Shown
window.GetRoute = GetRoute
window.SetRoute = SetRoute
