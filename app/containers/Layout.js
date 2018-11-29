/**
 * Layout component
 */

import React from 'react';
import cn from 'classnames';
import layoutStyles from '../styles/layout.css';
import styles from '../styles/spectre.min.css';

const { wrapper, header, main } = layoutStyles;

const {
  container,
  columns,
  column,
  'col-6': col6,
  'col-5': col5,
  'col-1': col1
} = styles;

// eslint-disabled-line-no-unused-vars
const Layout = props => {
  return (
    <div className={wrapper}>
      <div className={header} />
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
};

export default Layout;
