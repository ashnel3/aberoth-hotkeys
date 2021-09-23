import React, { ReactElement } from 'react'
import './close.scss'

/** Floating close button */
export const Close = (): ReactElement => {
  return (
    <div className="close" onClick={() => { window.ahk.Hide() }}>
      <span>&times;</span>
    </div>
  )
}
