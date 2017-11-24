/**
* Package inner container component
**/

'use strict';

import { remote, ipcRenderer } from 'electron';
import React from 'react';
import AppModal from 'react-modal';
import { AppModalStyles } from '../constants/AppConstants'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../actions/global_actions';
import * as packagesActions from '../actions/packages_actions';
import { showMessageBox } from '../utils';
import PackageDetails from '../components/package/PackageDetails';

const PackageContainer = (props) => {

  function _closeModal() {
    props.toggleModal(false, '');
    return false;
  }

  return (
    <div className="package-container">
      <PackageDetails
        mode={props.mode}
        directory={props.directory}
        active={props.active}
        packageActions={props.packageActions}
        setActive={props.setActive}
        toggleMainLoader={props.toggleMainLoader}
        toggleModal={props.toggleModal}
        packageJSON={props.packageJSON}
        isLoading={props.isLoading}
        cmdOptions={props.cmdOptions}
        addCommandOption={props.addCommandOption}
        clearCommandOptions={props.clearCommandOptions}
      />
      <AppModal isOpen={props.showModal} contentLabel="running npm command" style={AppModalStyles}>
          <h3>Please wait..</h3>
          <div className="m-wrapper" style={{padding:'5%', margin:'0 auto'}}>
            <pre className='code code-html'>
              <label>running</label>
              <code>{props.runningNpmCommand}</code>
              </pre>
          </div>
      </AppModal>
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
    isLoading: state.packages.isLoading,
    toggleModal: state.global.toggleModal,
    showModal: state.global.showModal,
    runningNpmCommand: state.global.runningNpmCommand
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
    },
    toggleModal: (bool, runningNpmCommand) => {
      return dispatch(globalActions.toggleModal(bool, runningNpmCommand));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer);
