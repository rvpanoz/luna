'use strict';

import React from 'react';
import AppNotificationsContainer from '../containers/AppNotificationsContainer';

const AppHeader = (props) => {
  return (
    <div className="navbar navbar-static-top header-navbar">
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
      <div className="topnavbar">
        <AppNotificationsContainer />
      </div>
    </div>
  )
}

export default AppHeader;
