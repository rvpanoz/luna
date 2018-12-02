/* eslint-disable-no-unused-var */

import React from 'react';
import { merge } from 'ramda';
import { useMappedState, useDispatch } from 'redux-react-hook';
import useIpc from '../commons/hooks/useIpc';
import styles from '../styles/spectre.min.css';

const { panel, 'panel-header': panelHeader, 'panel-body': panelBody } = styles;

const options = {
  ipcEvent: 'get-packages',
  cmd: ['outdated', 'list']
};

const mapState = state => ({
  packages: state.packages
});

const Packages = props => {
  const { mode, directory } = props;

  const { packages } = useMappedState(mapState);
  console.log(packages); //working

  // const [packages, error] = useIpc(
  //   'ipc-event',
  //   merge(options, {
  //     mode,
  //     directory
  //   })
  // );

  return (
    <div className={panel}>
      <div className={panelHeader}>Packages</div>
      <div className={panelBody} />
    </div>
  );
};

export default Packages;
