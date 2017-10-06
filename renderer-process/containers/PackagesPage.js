'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

//components
import Header from '../components/packages/Header';
import SearchBox from '../components/packages/SearchBox';
import PackagesList from '../components/packages/PackagesList';

const PackagesPage = (props) => {
  return (
    <div className="packages">
      <div className="container-fluid half-padding">
        <div className="row">
          <div className="col-md-4">
            <Header title="Packages"/>
            <SearchBox />
            <PackagesList
              loading={props.loading}
              setPackages={props.actions.setPackages}
              packages={props.packages}
              toggleLoader={props.actions.toggleLoader}
              setActive={props.actions.setActive}
              active={props.active}
            />
          </div>
          <div className="col-md-8">

          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {loading: state.loading, packages: state.packages, active: state.active};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesPage);
