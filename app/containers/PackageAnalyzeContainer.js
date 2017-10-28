'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Loader from '../common/Loader';

const PackageAnalyzeContainer = (props) => {
  return (
    <Loader loading={props.isLoading}>
      <div className="package-analyze">

      </div>
    </Loader>
  )

}
function mapStateToProps(state) {
  return {
    mode: state.global.mode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageAnalyzeContainer);
