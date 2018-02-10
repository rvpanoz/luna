import { withStyles } from 'material-ui/styles'
import { styles } from './styles'
import { showMessageBox, isUrl, autoBind } from '../../utils'
import { remote, ipcRenderer, shell } from 'electron'
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
        'doNavigate',
        'doAction',
        'onChangeVersion',
        'handleExpandClick',
        'handleChange',
        'runCommand',
        '_buildLink'
      ],
      this
    )
  }
  runCommand(action, version) {
    const { mode, directory } = this.props
    let cmd = [`npm ${action.toLowerCase()} `, active.name]

    if (mode === APP_MODES.LOCAL) {
      cmd.push(` --${options.join(' --')}`)
    }
    setActive(null)
    //WIP todo
    // toggleModal(true, cmd);
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
  doAction(e) {
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
  doNavigate(e) {
    e.preventDefault()
    const url = e.currentTarget.dataset.url
    if (isUrl(url)) {
      shell.openExternal(url)
    }
    return false
  }
  handleExpandClick(e) {
    const { toggleExpanded } = this.props
    toggleExpanded()
    this.forceUpdate()
  }
  handleChange(e, value) {
    const { setActiveTab } = this.props
    setActiveTab(value)
    this.forceUpdate()
  }
  _buildLink(item, url) {
    return (
      <React.Fragment>
        <span>{url}</span>
        <a title="navigate" href="#" onClick={this.doNavigate} data-url={url}>
          <LinkIcon color="accent" />
        </a>
      </React.Fragment>
    )
  }
  render() {
    const {
      classes,
      active,
      isLoading,
      mode,
      version,
      group,
      tabIndex,
      expanded,
      cmdOptions
    } = this.props
    const { doNavigate } = this

    if (!active) {
      return null
    }

    return (
      <section className={classes.root}>
        <h3 className={classes.heading}>{name}</h3>
        <Divider />
        <Card className={classes.card}>
          <CardHeader
            active={active}
            classes={classes}
            cmdOptions={cmdOptions}
            group={group}
          />
          <CardContent
            active={active}
            classes={classes}
            handleChange={this.handleChange}
            buildLink={this._buildLink}
            tabIndex={tabIndex}
            onChangeVersion={this.onChangeVersion}
            version={version}
          />
          <CardActions
            handleExpandClick={this.handleExpandClick}
            expanded={expanded}
            classes={classes}
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit />
        </Card>
      </section>
    )
  }
}

export default withStyles(styles)(PackageCard)
