/**
* NotificationItem component
**/

'use strict';

import React from 'react';

class NotificationItem extends React.Component {
  constructor(props) {
    super(props);
  }
  _fixMe(e) {
    e.preventDefault();
  }
  render() {
    let notification = this.props.notification;
    return (
      <li className="notification-info">
        <a href="#" onClick={this._fixMe}>
          <i className="fa fa-envelope pull-right"></i>
          <span className="block-line strong">{notification.body}</span>
        </a>
      </li>
    )
  }
}

export default NotificationItem;
