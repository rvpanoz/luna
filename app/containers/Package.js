/**
 * Package container
 * */

import { connect } from 'react-redux'
import { compose } from 'redux'
import { packageStyles } from '../styles/containers'
import { withStyles } from 'material-ui/styles'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import PropTypes from 'prop-types'
import React from 'react'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import PackageCard from 'components/package/Card'

class PackageContainer extends React.Component {
  render() {
    const { classes, active, isLoading, ...props } = this.props

    if (!active) {
      return null
    }

    return (
      <section className={classes.root}>
        <Grid container direction="row" justify="flex-start">
          <Grid item xs={10}>
            <PackageCard isLoading={isLoading} active={active} {...props} />
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
    setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
    toggleModal: (bool, npmCmd) =>
      dispatch(globalActions.toggleModal(bool, npmCmd))
  }
}

export default compose(
  withStyles(packageStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PackageContainer)
