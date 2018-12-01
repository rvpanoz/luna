/* eslint-disable-no-unused-var */

import React, { useEffect } from 'react';
import styles from '../styles/spectre.min.css';
import useIpc from '../commons/hooks/useIpc';
const { panel, 'panel-header': panelHeader, 'panel-body': panelBody } = styles;

const options = {
  ipcEvent: 'get-packages',
  cmd: ['outdated', 'list']
};

const Packages = props => {
  const { mode, directory } = props;

  const [packages, error] = useIpc('ipc-event', options);
  console.log(packages, error);
  return (
    <div className={panel}>
      <div className={panelHeader}>Packages</div>
      <div className={panelBody} />
    </div>
  );
};

export default Packages;
