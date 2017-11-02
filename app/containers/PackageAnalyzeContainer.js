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
      <div className="analyze">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-danger">
              <div className="panel-heading">
                <h3 className="panel-title">Blank Page</h3>
              </div>
              <div className="panel-body">
                <p>This is a blank page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loader>
  )
}

function mapStateToProps(state) {
  return {mode: state.global.mode};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageAnalyzeContainer);
