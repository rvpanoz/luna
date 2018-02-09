import { withStyles } from 'material-ui/styles'
import { styles } from './styles'
import { showMessageBox, isUrl, autoBind } from '../../utils'
import { remote, ipcRenderer, shell } from 'electron'
import React from 'react'
import moment from 'moment'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Card, { CardActions } from 'material-ui/Card'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Chip from 'material-ui/Chip'
import classnames from 'classnames'
import Divider from 'material-ui/Divider'
import InfoIcon from 'material-ui-icons/Info'
import LinkIcon from 'material-ui-icons/Link'
import CardHeader from './CardHeader'
import CardContent from './CardContent'

class PackageCard extends React.Component {
  constructor() {
    super()
    this._expanded = false
    autoBind(
      [
        'doNavigate',
        'doAction',
        'onChangeVersion',
        'handleExpandClick',
        'runCommand',
        'buildLink'
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
  onChangeVersion(e) {
    const target = e.currentTarget
    const { active, mode, directory, toggleMainLoader } = this.props
    const version = target.value

    if (version !== 'false') {
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
  handleChange(e, value) {
    this._expanded = value
    this.forceUpdate()
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
    this._expanded = !this._expanded
    this.forceUpdate()
  }
  buildLink(item, url) {
    return (
      <React.Fragment>
        <span>{url}</span>
        <a title="Navigate" href="#" onClick={this.doNavigate} data-url={url}>
          <LinkIcon color="accent" />
        </a>
      </React.Fragment>
    )
  }
  render() {
    const { classes, active, isLoading, mode, group } = this.props
    const { doNavigate } = this

    if (!active) {
      return null
    }

    return (
      <section>
        <h3 className={classes.heading}>{name}</h3>
        <Divider />
        <Card className={classes.card}>
          <CardHeader active={active} classes={classes} />
          <CardContent
            active={active}
            classes={classes}
            buildLink={this.buildLink}
          />

          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Install">add</IconButton>
            <IconButton aria-label="Uninstall">delete</IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this._expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this._expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this._expanded} timeout="auto" unmountOnExit />
        </Card>
      </section>
    )
  }
}

export default withStyles(styles)(PackageCard)
