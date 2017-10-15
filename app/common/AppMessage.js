import React from 'react';
import styles from './AppMessage.css';
console.log(styles);
class AppMessage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let message = this.props.appMessage;
    return (
      <div className={styles.app_notifications}>
        <div className={styles.app_notification}>
          <span className="app__message__label red">{message}</span>
        </div>
      </div>
    )
  }
}

export default AppMessage
