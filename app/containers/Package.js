/**
 * Package container
 * */

import { connect } from 'react-redux'
import { compose } from 'redux'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import PropTypes from 'prop-types'
import React from 'react'
import PackageCard from '../components/package/PackageCard'

class PackageContainer extends React.Component {
  render() {
    const { mode, active, isLoading, classes, latest, packageJSON } = this.props

    return (
      <div ref="rootEl">
        <PackageCard
          active={active}
          latest={latest}
          isLoading={isLoading}
          mode={mode}
          packageJSON={packageJSON}
        />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer)
