import React from 'react';
import styles from './AppNotifications.css';

class AppNotifications extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let message = this.props.appMessage;
    return (
      <div className={styles.app_notifications}>
        
      </div>
    )
  }
}

export default AppNotifications
