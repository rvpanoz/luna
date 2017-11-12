/**
* Common AppHeader component
**/

'use strict';

import { remote, ipcRenderer } from 'electron';
import React from 'react';
import { connect } from 'react-redux';
import Notifications from './header/Notifications';

const AppHeader = (props) => {
  let total_messages = 0;

  if(props.notifications && props.notifications.length) {
    total_messages = props.notifications.length;
  }

  return (
    <nav className="navbar navbar-default header-navbar">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" className="main-header">
          <div className="row">
            <div className="col-md-4">
              <a className="navbar-brand" href="#">
                <div className="logo text-nowrap">
                  <div className="logo__img">
                    <img className="img" src="./img/box.png"/>
                  </div>
                  <span className="logo__text">Luna</span>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-xs-12 col-md-offset-2">
              <div className="pull-right">
                <ul className="notification-info pull-left">
                  <li className="notifications dropdown">
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                      <i className="fa fa-bell"></i>
                      <span className="badge badge-danger">{total_messages}</span>
                    </a>
                    <ul className="dropdown-menu pull-right">
                      <li className="first">
                        <div className="small">
                          You have&nbsp;<strong>{total_messages}</strong>&nbsp;new notifications.
                        </div>
                      </li>
                      <li>
                        <Notifications notifications={props.notifications} />
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    notifications: state.global.messages
  };
}

export default connect(mapStateToProps)(AppHeader);
