import React from 'react';
import AppNotificationItem from './AppNotificationItem';

class AppNotifications extends React.Component {
  constructor(props) {
    super(props);
    this.openMessages = this.openMessages.bind(this);
    // this.showNotifications = this.showNotifications.bind(this);
    // this.hideNotifications = this.hideNotifications.bind(this);
  }
  _hideNotifications() {
    let notificationsDropdown = this.refs.notificationsDropdown;

    if (notificationsDropdown) {
      notificationsDropdown.classList.add('dd');
      notificationsDropdown.classList.remove('dropdown-transition');
    }
  }
  _showNotifications(e) {
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
  openMessages(e) {
    let notifications = this.props.notifications;
    if(!notifications.length) {
      let dropdown = this.refs.dropdown;
      if(dropdown) {
        e.stopPropagation();
        $(dropdown).toggleClass('open');
      }
    }
  }
  render() {
    let notifications = this.props.notifications;

    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown" ref="dropdown">
          <a href="#" className="dropdown-toggle" onClick={this.openMessages} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {(notifications.length) ? <span className="navbar-notification"></span> : null}
            <span>Messages</span> <i className="fa fa-envelope"></i>
          </a>
          <div className="dropdown-menu navbar-messages" ref="messages">
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
