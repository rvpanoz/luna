/**
 * Package container
 * */

import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  APP_MODES,
  APP_ACTIONS,
  PACKAGE_GROUPS,
  COMMAND_OPTIONS
} from 'constants/AppConstants'
import { styles } from './styles'
import { withStyles } from 'material-ui/styles'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import Loader from 'common/Loader'
import PropTypes from 'prop-types'
import React from 'react'
import Divider from 'material-ui/Divider'
import PackageCard from 'components/package/PackageCard'

class PackageContainer extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const {
      mode,
      active,
      clearCommandOptions,
      addCommandOption,
      packageJSON
    } = nextProps

    if (active && mode === APP_MODES.LOCAL) {
      //is in a group? (dependencies, devDependencies etc)
      PACKAGE_GROUPS.some((groupName, idx) => {
        if (packageJSON[groupName] && packageJSON[groupName][active.name]) {
          const packageGroup = groupName
          return true
        }
      })

      if (packageGroup == undefined) {
        return
      }

      // clear options
      clearCommandOptions()

      switch (packageGroup) {
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
      const groupDependencies = packageJSON[packageGroup]
      const version = groupDependencies[active.name]

      if (!isNaN(version.charAt(0))) {
        addCommandOption('save-exact')
      }
    }
  }
  constructor() {
    super()
  }
  componentWillReceiveProps() {
    const { mode, packageJSON, setPackageGroup, active } = this.props

    if (mode === APP_MODES.LOCAL) {
      if (!packageJSON) {
        throw new Error('PackageJSON is missing')
      }

      if (!active) {
        return
      }

      let found = false

      const groups = PACKAGE_GROUPS.some((group, idx) => {
        const { name } = active
        found = packageJSON[group] && packageJSON[group][name] ? group : false
        if (found) {
          setPackageGroup(group)
          return true
        }
      })
    }

    // this._setupUI()
  }
  componentDidMount() {
    // this._setupUI()
  }
  render() {
    const { classes, active, isLoading, ...props } = this.props

    if (!active) {
      return null
    }

    console.log(props)
    return (
      <section className={classes.root}>
        <Loader loading={isLoading}>
          <h3 className={classes.heading}>{active.name}</h3>
          <PackageCard isLoading={isLoading} active={active} {...props} />
        </Loader>
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
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PackageContainer)
