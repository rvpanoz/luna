import React from 'react';
import cn from 'classnames';
import styles from '../styles/spectre.min.css';

const { panel, 'panel-header': panelHeader, 'panel-body': panelBody } = styles;

const Packages = props => {
  return (
    <div className={panel}>
      <div className={panelHeader}>Packages</div>
      <div className={panelBody} />
    </div>
  );
};

export default Packages;
