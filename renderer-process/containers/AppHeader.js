'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

//menu items
import TopMenu from '../common/menu/TopMenu';

const AppTitle = (props) => {
  return (
    <div className="navbar-header">
      <a className="navbar-brand" href="#">
        <div className="logo text-nowrap">
          <div className="logo__img">
            <i className="fa fa-chevron-right"></i>
          </div>
          <span className="logo__text">{props.title}</span>
        </div>
      </a>
    </div>
  )
}

const AppHeader = (props) => {
  return (
    <nav className="navbar navbar-static-top header-navbar">
      <AppTitle title={props.title}/>
      <div className="topnavbar">
        <TopMenu setActivePage={props.actions.setActivePage}/>
      </div>
    </nav>
  )
}

function mapStateToProps(state) {
  return {
    activePage: state.activePage,
    pageTitle: state.pageTitle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
