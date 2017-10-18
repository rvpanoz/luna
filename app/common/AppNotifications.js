import React from 'react';
import AppNotificationItem from './AppNotificationItem';

class AppNotifications extends React.Component {
  constructor(props) {
    super(props)
    this.showNotifications = this.showNotifications.bind(this);
    this.hideNotifications = this.hideNotifications.bind(this);
  }
  hideNotifications() {
    let notificationsDropdown = this.refs.notificationsDropdown;

    if (notificationsDropdown) {
      notificationsDropdown.classList.add('dd');
      notificationsDropdown.classList.remove('dropdown-transition');
    }
  }
  showNotifications(e) {
    e.preventDefault();

    let notificationsDropdown = this.refs.notificationsDropdown;
    if (notificationsDropdown) {
      if (!notificationsDropdown.classList.contains('dd')) {
        this.hideNotifications();
      } else {
        notificationsDropdown.classList.remove('dd');
        notificationsDropdown.classList.add('dropdown-transition');
      }
    }
  }
  render() {
    let notifications = this.props.notifications;

    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span className="navbar-notification"></span>
            <span className="hidden-xs">Messages</span> <i className="fa fa-envelope visible-xs-inline-block"></i>
          </a>
          <div className="dropdown-menu navbar-messages">
            { (notifications) ? notifications.map((noti, idx) => {
              return <AppNotificationItem key={idx} notification={noti}/>
              }) : null
            }
          </div>
        </li>
      </ul>
    )
  }
}

export default AppNotifications;
