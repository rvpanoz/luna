/**
* Package inner container component
**/

'use strict';

import { remote, ipcRenderer } from 'electron';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../actions/global_actions';
import * as packagesActions from '../actions/packages_actions';

import Loader from '../common/Loader';
import { showMessageBox } from '../utils';
import PackageDetails from '../components/package/PackageDetails';

const PackageContainer = (props) => {
  return (
    <div className="package-container">
      <PackageDetails
        mode={props.mode}
        directory={props.directory}
        active={props.active}
        packageActions={props.packageActions}
        setActive={props.setActive}
        toggleMainLoader={props.toggleMainLoader}
        packageJSON={props.packageJSON}
        isLoading={props.isLoading}
        cmdOptions={props.cmdOptions}
        addCommandOption={props.addCommandOption}
        clearCommandOptions={props.clearCommandOptions}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory,
    packageJSON: state.global.packageJSON,
    cmdOptions: state.global.cmdOptions,
    packageActions: state.packages.packageActions,
    active: state.packages.active,
    isLoading: state.packages.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCommandOption: (option) => {
      return dispatch(globalActions.addCommandOption(option));
    },
    clearCommandOptions: () => {
      return dispatch(globalActions.clearCommandOptions());
    },
    toggleMainLoader: (bool) => {
      return dispatch(packagesActions.toggleMainLoader(bool));
    },
    setActive: (pkg) => {
      return dispatch(packagesActions.setActive(pkg));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer);
