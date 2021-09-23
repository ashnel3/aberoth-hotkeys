import { ReactElement } from "react";
import { createUseStyles } from "react-jss";

/** Meta-data component */
export const Meta = (): ReactElement => {
  const useStyles = createUseStyles((theme) => ({
    '.meta': {
      margin: '0',
      padding: '0 20px',
      listStyle: 'none',

      '& li': {
        fontSize: '14px',
      }
    }
  }))

  const buildDate = new Date(window.ahk.GetMeta('build_date'))
  const daysSinceBuild = Math.round((new Date().getTime() - buildDate.getTime())/(1000*60*60*24))
  const styles = useStyles()

  return (
    <ul className={styles['.meta']}>
      <li id="build-version">Version: {window.ahk.GetMeta('build_version')}</li>
      <li id="build-date">Build date: {buildDate.toLocaleDateString()}, <i>({daysSinceBuild} days ago)</i></li>
      <li id="build-commit">Build commit: {window.ahk.GetMeta('build_commit')}</li>
      <br />
      <li id="version-ahk">Auto-Hotkey version: {window.ahk.GetMeta('ahk_version')}</li>
      <li id="version-neutron">Neutron.ahk version: {window.ahk.GetMeta('neutron_version')}</li>
      <li id="version-os">Windows version: {window.ahk.GetMeta('os_version')}</li>
      <li id="version-trident">IE version: {window.ahk.GetMeta('ie_version')}</li>
    </ul>
  )
}
