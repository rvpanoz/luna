/**
 * Layout component
 */

/* eslint-disable no-unused-vars */

import React from 'react';
import cn from 'classnames';
import layoutStyles from '../styles/layout.css';
import styles from '../styles/spectre.min.css';
import Header from '../components/Header';

const { wrapper, header, main } = layoutStyles;

const {
  container,
  columns,
  column,
  'col-6': col6,
  'col-5': col5,
  'col-1': col1
} = styles;

const Layout = props => (
  <div className={wrapper}>
    <div className={header}>
      <Header />
    </div>
    <div className={main}>
      <div className={container}>
        <div className={columns}>
          <div className={cn(column, col1)}>col-1</div>
          <div className={cn(column, col5)}>col-5</div>
          <div className={cn(column, col6)}>col-6</div>
        </div>
      </div>
    </div>
  </div>
);

export default Layout;
