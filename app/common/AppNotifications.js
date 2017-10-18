import React from 'react';

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
      <div className="notifications-bar">
        <div className="notification" onClick={this.showNotifications}>
          <i className="fa fa-bell-o"></i>
          <div className="top-count common-count">
            <div className="value">{(notifications) ? notifications.length : 0}</div>
          </div>
        </div>
        <div className="notification-dropdown dd" ref="notificationsDropdown">
          <div className="arrow-up"></div>
          <div className="header">
            <div className="heading">Notifications</div>
            <div className="inner-count common-count">
              <div className="value">{(notifications) ? notifications.length : 0}</div>
            </div>
          </div>
          <div className="items">
            { (notifications) ? notifications.map((noti, idx) => {
                return (
                  <div className="noti noti--red" key={idx}>
                    <div className="noti-icon">
                      <i className="fa fa-times"></i>
                    </div>
                    <div className="noti-body">
                      <p>{noti.notificationMessage}</p>
                      <button className="noti-button" id="js-helpMe">Fix it!</button>
                      <button className="noti-button js-notiClose">Don't care.</button>
                    </div>
                    <button className="noti-close js-notiClose">
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                )
              }) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default AppNotifications;
