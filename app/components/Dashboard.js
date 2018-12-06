import { remote, ipcRenderer } from 'electron';
import React, { useLayoutEffect } from 'react';
import styles from '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <section className={styles.centered}>
        <div className={styles.one}>
          <h1 className={styles['section-headline']}>Analyze directory.</h1>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
