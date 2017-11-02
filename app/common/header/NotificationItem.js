import React from 'react';

class NotificationItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let notification = this.props.notification;
    return (
      <li className="notification-info">
        <a href="#">
          <i className="fa fa-envelope pull-right"></i>
          <span className="block-line strong">{notification.body}</span>
        </a>
      </li>
    )
  }
}

export default NotificationItem;
