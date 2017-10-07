'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

//components
import PackagesListHeader from '../components/packages/PackagesListHeader';
import SearchBox from '../components/packages/SearchBox';
import PackagesList from '../components/packages/PackagesList';
import PackageContainer from '../containers/PackageContainer';

const PackagesPage = (props) => {
  return (
    <div className="packages">
      <div className="container-fluid half-padding">
        <div className="row">
          <div className="col-md-4">
            <PackagesListHeader
              title="Packages"
              toggleLoader={props.actions.toggleLoader}
              setActive={props.actions.setActive}
              active={props.active}
            />
            <SearchBox
              toggleLoader={props.actions.toggleLoader}
              setActive={props.actions.setActive}
            />
            <PackagesList
              loading={props.loading}
              packages={props.packages}
              setPackages={props.actions.setPackages}
              toggleLoader={props.actions.toggleLoader}
              setActive={props.actions.setActive}
              active={props.active}
            />
          </div>
          <div className="col-md-8">
            <PackageContainer active={props.active} />
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
