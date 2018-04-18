/**
 * Package container
 * */

import { connect } from 'react-redux'
import { compose } from 'redux'
import { withStyles } from 'material-ui/styles'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import { triggerEvent, autoBind } from 'utils'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Grid from 'material-ui/Grid'
import PackageCard from 'components/package/PackageCard'
import PackageActions from 'components/package/PackageActions'
import Loader from 'common/Loader'

const styles = {
  root: {
    width: '100%'
  }
}

class PackageContainer extends React.Component {
  constructor(props) {
    super(props)
    autoBind(['onChangeVersion', 'onExpandClick'], this)
  }
  componentWillUnmount() {
    const { expanded, toggleExpanded } = this.props

    if (expanded) {
      toggleExpanded()
    }
  }
  onChangeVersion(e, value) {
    const { active, mode, directory, toggleMainLoader, setVersion } = this.props

    const version = (e && e.target.value) || value

    if (version && version !== 'false') {
      toggleMainLoader(true)
      setVersion(version)
      triggerEvent('view-package', {
        mode,
        directory,
        cmd: ['view'],
        pkgName: active.name,
        pkgVersion: version,
        repo: active.repository || null
      })
    }
    return false
  }
  render() {
    const {
      active,
      classes,
      isLoading,
      loading,
      settings,
      ...rest
    } = this.props

    return (
      <Loader loading={isLoading}>
        {active ? (
          <section className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={8} md={8} lg={8}>
                <PackageCard
                  active={active}
                  onChangeVersion={this.onChangeVersion}
                  loading={loading}
                  isLoading={isLoading}
                  settings={settings}
                  {...rest}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3}>
                <PackageActions
                  active={active}
                  onChangeVersion={this.onChangeVersion}
                  settings={settings}
                  {...rest}
                />
              </Grid>
            </Grid>
          </section>
        ) : null}
      </Loader>
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
    addCommandOption: (option) =>
      dispatch(packagesActions.addCommandOption(option)),
    setActiveTab: (tabIndex) =>
      dispatch(packagesActions.setActiveTab(tabIndex)),
    toggleExpanded: (value) => dispatch(packagesActions.toggleExpanded(value)),
    setPackageGroup: (group, option) =>
      dispatch(packagesActions.setPackageGroup(group, option)),
    setPackageActions: (actions) =>
      dispatch(packagesActions.setPackageActions(actions)),
    removeCommandOption: (option) =>
      dispatch(packagesActions.removeCommandOption(option)),
    clearCommandOptions: () => dispatch(packagesActions.clearCommandOptions()),
    toggleMainLoader: (bool) =>
      dispatch(packagesActions.toggleMainLoader(bool)),
    toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool)),
    setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
    setVersion: (version) => dispatch(packagesActions.setVersion(version)),
    toggleModal: (bool) => dispatch(globalActions.toggleModal(bool))
  }
}

PackageContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PackageContainer)
