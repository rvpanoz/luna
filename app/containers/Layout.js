/**
 * Layout component
 */

import { ipcRenderer } from 'electron';
import React from 'react';
import layoutStyles from '../styles/layout.css';
import PackagesList from '../components/Packages';
import cn from 'classnames';
import styles from '../styles/spectre.min.css';

const { wrapper, header, main } = layoutStyles;

const {
  container,
  columns,
  column,
  'col-12': col12,
  'col-9': col9,
  'col-6': col6,
  'col-3': col3
} = styles;

const Layout = props => {
  return (
    <div className={wrapper}>
      <div className={header} />
      <div className={main}>
        <div className={container}>
          <div className={columns}>
            <div className={cn(column, col3)}>Sidebar</div>
            <div className={cn(column, col6)}>
              <PackagesList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
