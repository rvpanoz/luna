import React from 'react';
import styles from './AppHeader.css';
console.log(styles);

const AppHeader = (props) => {
  return (
    <div className={`navbar navbar-static-top ${styles['header-navbar']}`}>
      <div className={styles['navbar-header']}></div>
      <div className={styles.topnavbar}>
        
      </div>
    </div>
  )
}

export default AppHeader;
