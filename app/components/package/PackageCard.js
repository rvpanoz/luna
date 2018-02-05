import { withStyles } from 'material-ui/styles'
import { packageStyles } from '../styles'
import { showMessageBox, isUrl, autoBind } from '../../utils'
import React from 'react'
import moment from 'moment'
import { remote, ipcRenderer } from 'electron'
import { APP_MODES, APP_ACTIONS, PACKAGE_GROUPS } from 'constants/AppConstants'
import Collapse from 'material-ui/transitions/Collapse'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Chip from 'material-ui/Chip'
import classnames from 'classnames'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import Loader from 'common/Loader'

import FolderList from '../common/FolderList'

class PackageCard extends React.Component {
  constructor() {
    super()
    this._group = null
    this._expanded = false
    autoBind(
      ['doNavigate', 'doAction', 'onChangeVersion', 'handleExpandClick'],
      this
    )
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
        () => {
          const npmCmd = [`npm ${action.toLowerCase()} `, active.name]
          if (mode === APP_MODES.LOCAL) {
            npmCmd.push(` --${options.join(' --')}`)
          }
          setActive(null)
          toggleModal(true, npmCmd)
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
  componentDidUpdate() {
    const { mode, packageJSON } = this.props

    if (mode === APP_MODES.LOCAL) {
      if (!packageJSON) {
        throw new Error('PackageJSON is missing')
      }

      const { active } = this.props
      if (!active) {
        return
      }
      let found = false

      const groups = PACKAGE_GROUPS.some((group, idx) => {
        const { name } = active
        found = packageJSON[group] && packageJSON[group][name] ? group : false
        if (found) {
          this._group = group
          return true
        }
      })
    }
  }
  doNavigate(e) {
    e.preventDefault()
    const url = e.target.dataset.url
    if (isUrl(url)) {
      shell.openExternal(url)
    }
    return false
  }
  handleExpandClick(e) {
    this._expanded = !this._expanded
    this.forceUpdate()
  }
  render() {
    const { classes, active, isLoading, mode } = this.props
    const group = this._group

    if (!active) {
      return null
    }

    function buildTitle() {
      const { name, author, version } = active
      return group ? `${name} - v${version}` : name
    }

    return (
      <section>
        <Loader loading={isLoading}>
          <h3 className={classes.heading}>{name}</h3>
          <Divider />
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label={active.name} className={classes.avatar}>
                  {active.name[0].toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={buildTitle()}
              subheader={group || active.version}
            />
            <CardContent>
              <section>
                <h3 className={classes.heading}>Description</h3>
                <Divider />
                <Typography className={classes.description}>
                  {active.description}
                </Typography>
              </section>
              <section>
                <FolderList active={active} />
              </section>
            </CardContent>
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
            <Collapse in={this._expanded} timeout="auto" unmountOnExit>
              <CardContent className={classes.cardContent}>
                <section>
                  <h3 className={classes.heading}>Author</h3>
                  <Divider />
                  <Typography className={classes.author}>
                    {active.author}
                  </Typography>
                </section>
                {active && active.keywords ? (
                  <div className={classes.keywords}>
                    <h3 className={classes.heading}>Keywords</h3>
                    <Divider />
                    <br />
                    <div className={classes.keywordItems}>
                      {active.keywords.map((keyword, idx) => {
                        return (
                          <Chip
                            className={classes.chip}
                            key={idx}
                            label={keyword}
                          />
                        )
                      })}
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Collapse>
          </Card>
        </Loader>
      </section>
    )
  }
}

export default withStyles(packageStyles)(PackageCard)
