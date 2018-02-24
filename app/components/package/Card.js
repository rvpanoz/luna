/**
 * PackageCard component
 *
 */

import { withStyles } from 'material-ui/styles'
import { packageCardStyles } from '../../styles/components'
import { showMessageBox, isUrl, autoBind } from '../../utils'
import { remote, ipcRenderer, shell } from 'electron'
import List, { ListItem, ListItemText } from 'material-ui/List'
import {
  APP_MODES,
  APP_ACTIONS,
  PACKAGE_GROUPS,
  COMMAND_OPTIONS
} from 'constants/AppConstants'
import React from 'react'
import Collapse from 'material-ui/transitions/Collapse'
import Card from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import classnames from 'classnames'
import Divider from 'material-ui/Divider'
import InfoIcon from 'material-ui-icons/Info'
import LinkIcon from 'material-ui-icons/Link'
import CardHeader from './CardHeader'
import CardContent from './CardContent'
import CardActions from './CardActions'
import CardDetails from './CardDetails'

class PackageCard extends React.Component {
  constructor() {
    super()
    autoBind(
      [
        'onNavigate',
        'onAction',
        'onChangeVersion',
        'onExpandClick',
        'onChange',
        'runCommand',
        'setupGroup',
        'setupOptions'
      ],
      this
    )
  }
  componentDidMount() {
    const { active, setVersion } = this.props
    this.setupGroup()
    setVersion(active.version)
  }
  onAction(e) {
    e.preventDefault()

    const target = e.currentTarget
    const action = target.dataset.action
    const { mode, active, setActive, toggleModal } = this.props
    const options = this.props.cmdOptions

    if (action) {
      const selectVersion = this.refs.selectVersion
      let version

      if (action === APP_ACTIONS.UNINSTALL) {
        version = null
      } else {
        version =
          selectVersion && selectVersion.value !== 'false'
            ? selectVersion.value
            : 'latest'
      }

      showMessageBox(
        {
          action,
          name: active.name,
          version
        },
        () => this.runCommand(action, version)
      )
    }
    return false
  }
  onNavigate(e) {
    e.preventDefault()
    const url = e.currentTarget.dataset.url
    if (isUrl(url)) {
      shell.openExternal(url)
    }
    return false
  }
  onExpandClick(e) {
    const { toggleExpanded } = this.props
    toggleExpanded()
    this.forceUpdate()
  }
  onChangeChange(e, value) {
    const { setActiveTab } = this.props
    setActiveTab(value)
    this.forceUpdate()
  }
  onChangeVersion(e, value) {
    const { active, mode, directory, toggleMainLoader, setVersion } = this.props
    const version = e.target.value

    if (version && version !== 'false') {
      setVersion(version)
      ipcRenderer.send('ipc-event', {
        mode,
        directory,
        ipcEvent: 'view-package',
        cmd: ['view'],
        pkgName: active.name,
        pkgVersion: version
      })
    }
    return false
  }
  runCommand(action, version) {
    const { mode, directory } = this.props
    let cmd = [`npm ${action.toLowerCase()} `, active.name]

    if (mode === APP_MODES.LOCAL) {
      cmd.push(` --${options.join(' --')}`)
    }
    setActive(null)
    ipcRenderer.send('ipc-event', {
      mode,
      directory,
      ipcEvent: action,
      cmd: [action === 'Uninstall' ? 'uninstall' : 'install'],
      pkgName: active.name,
      pkgVersion: action === 'Uninstall' ? null : version,
      pkgOptions: options
    })
  }
  setupOptions(group) {
    const {
      addCommandOption,
      active,
      clearCommandOptions,
      packageJSON
    } = this.props

    // clear options
    clearCommandOptions()

    switch (group) {
      case 'dependencies':
        addCommandOption('save')
        break
      case 'devDependencies':
        addCommandOption('save-dev')
        break
      case 'optionalDependencies':
        addCommandOption('save-optional')
        break
      default:
    }

    // save-exact fix
    const groupDependencies = packageJSON[group]
    const name = groupDependencies[active.name]

    if (!isNaN(name.charAt(0))) {
      addCommandOption('save-exact')
    }
  }
  setupGroup() {
    const {
      mode,
      packageJSON,
      setPackageGroup,
      addCommandOption,
      clearCommandOptions,
      active,
      group
    } = this.props

    if (mode === APP_MODES.LOCAL) {
      if (!packageJSON) {
        throw new Error('PackageJSON is missing')
      }

      if (!active) {
        return
      }

      let found = false

      const groups = Object.keys(PACKAGE_GROUPS).some((group, idx) => {
        const { name } = active
        found = packageJSON[group] && packageJSON[group][name] ? group : false
        if (found) {
          setPackageGroup(group)
          this.setupOptions(group)
          return true
        }
      })
    }
  }
  render() {
    const {
      classes,
      active,
      group,
      mode,
      expanded,
      setActive,
      toggleLoader,
      addCommandOption,
      clearCommandOptions,
      cmdOptions,
      actions,
      defaultActions,
      version,
      ...props
    } = this.props
    const { onNavigate, onChangeVersion } = this

    if (!active) {
      return null
    }

    return (
      <section className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            mode={mode}
            active={active}
            classes={classes}
            group={group}
            cmdOptions={cmdOptions}
            onNavigate={this.onNavigate}
          />
          <CardContent
            classes={classes}
            active={active}
            group={group}
            handleChange={this.onChange}
            onChangeVersion={this.onChangeVersion}
            addCommandOption={addCommandOption}
            clearCommandOptions={clearCommandOptions}
            {...props}
          />
          <CardActions
            handleExpandClick={this.onExpandClick}
            expanded={expanded}
            classes={classes}
            actions={actions}
            defaultActions={defaultActions}
            active={active}
            toggleLoader={toggleLoader}
            mode={mode}
            setActive={setActive}
            version={version}
          />
          <Collapse
            style={{ display: 'none' }}
            in={expanded}
            timeout="auto"
            unmountOnExit
            className={classes.collapseContent}
          >
            <CardDetails {...active} classes={classes} />
          </Collapse>
        </Card>
      </section>
    )
  }
}

export default withStyles(packageCardStyles)(PackageCard)
