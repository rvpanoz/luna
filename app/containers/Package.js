/**
 * Package container
 * */

import { connect } from 'react-redux'
import { compose } from 'redux'
import { packageStyles } from 'styles/containers'
import { withStyles } from 'material-ui/styles'
import { APP_MODES } from 'constants/AppConstants'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import PropTypes from 'prop-types'
import React from 'react'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import PackageCard from 'components/package/Card'
import CardHeader from './components/package/CardHeader'

class PackageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.setupGroup = this.setupGroup.bind(this)
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
    const { classes, active, isLoading, version, ...rest } = this.props

    if (!active) {
      return null
    }

    return (
      <section className={classes.root}>
        <Grid container direction="row" justify="flex-start">
          <Grid item xs={10}>
            <PackageCard
              header={<CardHeader />}
              isLoading={isLoading}
              version={version}
              active={active}
              {...rest}
            />
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
    cmdOptions: state.global.cmdOptions,
    actions: state.packages.actions,
    defaultActions: state.packages.defaultActions,
    active: state.packages.active,
    isLoading: state.packages.isLoading,
    toggleModal: state.global.toggleModal,
    showModal: state.global.showModal,
    npmCmd: state.global.npmCmd,
    group: state.packages.group,
    expanded: state.packages.expanded,
    tabIndex: state.packages.tabIndex,
    version: state.packages.version
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setupSnackbar: (snackbarOptions) =>
      dispatch(globalActions.setupSnackbar(snackbarOptions)),
    toggleSnackbar: (bool) => dispatch(globalActions.toggleSnackbar(bool)),
    addCommandOption: (option) =>
      dispatch(globalActions.addCommandOption(option)),
    setVersion: (version) => dispatch(packagesActions.setVersion(version)),
    setActiveTab: (tabIndex) =>
      dispatch(packagesActions.setActiveTab(tabIndex)),
    toggleExpanded: (value) => dispatch(packagesActions.toggleExpanded(value)),
    setPackageGroup: (group) =>
      dispatch(packagesActions.setPackageGroup(group)),
    addCommandOption: (option) =>
      dispatch(globalActions.addCommandOption(option)),
    clearCommandOptions: () => dispatch(globalActions.clearCommandOptions()),
    toggleMainLoader: (bool) =>
      dispatch(packagesActions.toggleMainLoader(bool)),
    toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool)),
    setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
    toggleModal: (bool, npmCmd) =>
      dispatch(globalActions.toggleModal(bool, npmCmd))
  }
}

export default compose(
  withStyles(packageStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PackageContainer)
