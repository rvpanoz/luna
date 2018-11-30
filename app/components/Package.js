import React from 'react';
import cn from 'classnames';
import styles from '../styles/spectre.min.css';

const { panel, 'panel-header': panelHeader, 'panel-body': panelBody } = styles;

const Package = props => {
  return (
    <div className={panel}>
      <div className={panelHeader}>Package</div>
      <div className={panelBody} />
    </div>
  );
};

export default Package;
