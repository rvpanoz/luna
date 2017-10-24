'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Loader from '../common/Loader';
import {showMessageBox} from '../utils';
import PackageDetails from '../components/package/PackageDetails';

const PackageContainer = (props) => {
  return (
    <Loader loading={props.isLoading}>
      <div className="package-container">
        <PackageDetails
          active={props.active}
          packageActions={props.packageActions}
          mode={props.mode}
          setActive={props.actions.setActive}
          toggleMainLoader={props.actions.toggleMainLoader}
          isLoading={props.isLoading}/>
      </div>
    </Loader>
  )

}
function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    packageActions: state.global.packageActions,
    active: state.packages.active,
    isLoading: state.packages.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer);
