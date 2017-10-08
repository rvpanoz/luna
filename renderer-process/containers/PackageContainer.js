'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import {showMessageBox} from '../../utils';
import PackageDetails from '../components/package/PackageDetails';

const PackageContainer = (props) => {
  return (
    <div className="package-container">
      <PackageDetails
        setActive={props.actions.setActive}
        pkg={props.active}
        mode={props.mode}
        active={props.active}
        modeActions={props.modeActions}
        toggleMainLoader={props.actions.toggleMainLoader}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mode: state.mode,
    modeActions: state.modeActions,
    package_loading: state.package_loading,
    active: state.active
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer);
