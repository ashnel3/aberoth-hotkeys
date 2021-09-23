import React, { ReactElement } from 'react'
import './sidenav.scss'

// TODO: Add sidenav images

export interface SideNavProps {
  children: ReactElement | ReactElement[]
}

/**
 * Side navbar
 * @param props
 */
export const SideNav = (props: SideNavProps): ReactElement => {
  return (
    <nav className="sidenav">
      <div className="sidenav-container">
        <ul className="nav">
          {props.children}
        </ul>
      </div>
    </nav>
  )
}
