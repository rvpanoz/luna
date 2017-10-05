'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import PackageHeader from '../components/PackageHeader';
import PackageDetails from '../components/PackageDetails';

const PackageContainer = (props) => {
  return (
    <div className="main">
      <div className="ui container">
          <div className="ui basic padded segment">
            <PackageHeader pkg={props.active} />
          </div>
          <div className="ui basic padded segment">
            <PackageDetails pkg={props.active} />
          </div>
        </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {loading: state.loading, active: state.active};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer);
