/**
 * Package container
 * */

import { remote, ipcRenderer } from 'electron'
import { showMessageBox, isUrl, autoBind } from '../utils'
import { APP_MODES, APP_ACTIONS, PACKAGE_GROUPS } from 'constants/AppConstants'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { bindActionCreators } from 'redux'
import { withStyles } from 'material-ui/styles'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import Loader from 'common/Loader'
import Chip from 'material-ui/Chip'
import classnames from 'classnames'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import Collapse from 'material-ui/transitions/Collapse'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import { packageStyles } from './styles'

class Package extends React.Component {
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
      toggleMainLoader(true)
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
    const { mode, active, isLoading, classes, latest } = this.props
    const group = this._group

    if (!active) {
      return null
    }

    function buildTitle() {
      const author = active.author
      return <Typography component="div">{author}</Typography>
    }

    return (
      <Loader loading={isLoading}>
        <div ref="rootEl">
          <h3 className={classes.heading}>{active.name}</h3>
          <Divider />
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  {active.license}
                </Avatar>
              }
              title={buildTitle()}
              subheader={active.version}
            />
            <CardContent>
              {group ? <Chip label={group} className={classes.chip} /> : null}
              <Divider />
              <Typography component="div" className={classes.description}>
                {active.description}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">add</IconButton>
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
              <CardContent>
                <Typography paragraph type="body2">
                  Details:
                </Typography>
                <Typography paragraph>
                  Updated:&nbsp;
                  {moment(active.time.modified).format('DD/MM/YYYY')}
                </Typography>
                <Typography paragraph>{active.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      </Loader>
    )
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory,
    packageJSON: state.global.packageJSON,
    cmdOptions: state.global.cmdOptions,
    actions: state.packages.actions,
    active: state.packages.active,
    isLoading: state.packages.isLoading,
    toggleModal: state.global.toggleModal,
    showModal: state.global.showModal,
    npmCmd: state.global.npmCmd
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCommandOption: (option) =>
      dispatch(globalActions.addCommandOption(option)),
    clearCommandOptions: () => dispatch(globalActions.clearCommandOptions()),
    toggleMainLoader: (bool) =>
      dispatch(packagesActions.toggleMainLoader(bool)),
    setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
    toggleModal: (bool, npmCmd) =>
      dispatch(globalActions.toggleModal(bool, npmCmd))
  }
}

export default compose(
  withStyles(packageStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Package)
