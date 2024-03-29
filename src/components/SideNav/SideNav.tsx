import React, { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import { AberothHotkeysTheme } from '../../types'

// TODO: Add sidenav images

export interface SideNavProps {
  width: number
  children: ReactElement | ReactElement[]
}

/**
 * Side navbar
 * @param props
 */
export const SideNav = (props: SideNavProps): ReactElement => {
  const useStyles = createUseStyles((theme: AberothHotkeysTheme) => ({
    '.nav': {
      margin: 0,
      padding: 0,
      listStyle: 'none',

      '&:first-child': {
        marginTop: '12px',
      },

      '& li': {
        padding: '12px 18px',
      },

      '& hr': {
        display: 'block',
        height: '1px',
        margin: '12px 0',
        border: 'none',
        borderTop: '1px solid black',
      }
    },

    '.container': {
      height: '100%',
      position: 'relative',
    },

    '.sidenav': {
      position: 'fixed',
      width: `${props.width}px`,
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: theme.palette.background300,

      '& footer': {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        padding: '12px 0',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background400,

        '& ul': {
          margin: 0,
          padding: 0,
          listStyle: 'none',
          userSelect: 'none',

          '& li': {
            display: 'inline',
            margin: '0 4px',
            padding: '8px 0',
            float: 'left',
            color: theme.palette.action,

            '&:hover': {
              color: theme.palette.action2,
            },
          }
        },
      }
    },
  }))

  const styles = useStyles()
  return (
    <nav className={styles['.sidenav']}>
      <div className={styles['.container']}>
        <ul className={styles['.nav']}>
          {props.children}
        </ul>
      </div>
    </nav>
  )
}
