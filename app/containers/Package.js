/**
 * Package container
 * */

import { connect } from 'react-redux'
import { compose } from 'redux'
import { remote, ipcRenderer, shell } from 'electron'
import { packageCardStyles } from 'styles/components'
import { withStyles } from 'material-ui/styles'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import { showMessageBox, isUrl, autoBind } from 'utils'
import { APP_MODES, APP_ACTIONS, PACKAGE_GROUPS } from 'constants/AppConstants'
import Collapse from 'material-ui/transitions/Collapse'
import Card from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import classnames from 'classnames'
import InfoIcon from 'material-ui-icons/Info'
import LinkIcon from 'material-ui-icons/Link'
import CardHeader from 'components/package/CardHeader'
import CardContent from 'components/package/CardContent'
import CardActions from 'components/package/CardActions'
import CardDetails from 'components/package/CardDetails'
import PropTypes from 'prop-types'
import React from 'react'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'

class PackageContainer extends React.Component {
  constructor(props) {
    super(props)
    autoBind(['onChangeVersion', 'onExpandClick'], this)
  }
  onExpandClick(e) {
    const { toggleExpanded } = this.props
    toggleExpanded()
    this.forceUpdate()
  }
  componentDidMount() {
    const {
      packageJSON,
      active,
      mode,
      setPackageGroup,
      addCommandOption,
      clearCommandOptions
    } = this.props

    clearCommandOptions()

    if (mode === APP_MODES.LOCAL && active) {
      let found = false

      Object.keys(PACKAGE_GROUPS).some((groupName, idx) => {
        found =
          packageJSON[groupName] && packageJSON[groupName][active.name]
            ? groupName
            : false
        if (found) {
          setPackageGroup(groupName)
          return found
        }
      })
    }
  }
  onChangeVersion(e, value) {
    const { active, mode, directory, toggleMainLoader, setVersion } = this.props
    const version = e.target && e.target.value

    if (version && version !== 'false') {
      toggleMainLoader(true)
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
  render() {
    const {
      classes,
      active,
      group,
      mode,
      directory,
      expanded,
      setActive,
      toggleLoader,
      addCommandOption,
      removeCommandOption,
      clearCommandOptions,
      cmdOptions,
      actions,
      defaultActions,
      version,
      setupSnackbar,
      toggleSnackbar,
      ...rest
    } = this.props

    if (!active) {
      return null
    }

    return (
      <section className={classes.root}>
        <Grid container direction="row" justify="flex-start">
          <Grid item xs={10}>
            <section className={classes.root}>
              <Card className={classes.card}>
                <CardHeader
                  classes={classes}
                  mode={mode}
                  active={active}
                  group={group}
                />
                <CardContent
                  version={version}
                  classes={classes}
                  active={active}
                  cmdOptions={cmdOptions}
                  onChangeVersion={this.onChangeVersion}
                  addCommandOption={addCommandOption}
                  removeCommandOption={removeCommandOption}
                  clearCommandOptions={clearCommandOptions}
                  mode={mode}
                />
                <CardActions
                  active={active}
                  handleExpandClick={this.onExpandClick}
                  expanded={expanded}
                  setActive={setActive}
                  toggleLoader={toggleLoader}
                  classes={classes}
                  actions={actions}
                  defaultActions={defaultActions}
                  setupSnackbar={setupSnackbar}
                  toggleSnackbar={toggleSnackbar}
                  mode={mode}
                  version={version}
                  directory={directory}
                  cmdOptions={cmdOptions}
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
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory,
    packageJSON: state.global.packageJSON,
    toggleModal: state.global.toggleModal,
    showModal: state.global.showModal,
    npmCmd: state.global.npmCmd,
    cmdOptions: state.packages.cmdOptions,
    group: state.packages.group,
    expanded: state.packages.expanded,
    tabIndex: state.packages.tabIndex,
    version: state.packages.version,
    actions: state.packages.actions,
    defaultActions: state.packages.defaultActions,
    active: state.packages.active,
    isLoading: state.packages.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setupSnackbar: (snackbarOptions) =>
      dispatch(globalActions.setupSnackbar(snackbarOptions)),
    toggleSnackbar: (bool) => dispatch(globalActions.toggleSnackbar(bool)),
    addCommandOption: (option) =>
      dispatch(globalActions.addCommandOption(option)),
    setActiveTab: (tabIndex) =>
      dispatch(packagesActions.setActiveTab(tabIndex)),
    toggleExpanded: (value) => dispatch(packagesActions.toggleExpanded(value)),
    setPackageGroup: (group) =>
      dispatch(packagesActions.setPackageGroup(group)),
    addCommandOption: (option) =>
      dispatch(packagesActions.addCommandOption(option)),
    removeCommandOption: (option) =>
      dispatch(packagesActions.removeCommandOption(option)),
    clearCommandOptions: () => dispatch(packagesActions.clearCommandOptions()),
    toggleMainLoader: (bool) =>
      dispatch(packagesActions.toggleMainLoader(bool)),
    toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool)),
    setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
    setVersion: (version) => dispatch(packagesActions.setVersion(version)),
    toggleModal: (bool, npmCmd) =>
      dispatch(globalActions.toggleModal(bool, npmCmd))
  }
}

export default compose(
  withStyles(packageCardStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PackageContainer)
