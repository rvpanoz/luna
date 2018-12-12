/* eslint-disable */

import React, { useEffect } from 'react';
import { merge } from 'ramda';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { SET_PACKAGES } from '../../constants/ActionTypes';
import useIpc from '../../commons/hooks/useIpc';
import styles from '../../styles/spectre.min.css';

const {
  panel,
  'panel-header': panelHeader,
  'panel-body': panelBody,
  'panel-nav': panelNav
} = styles;

const options = {
  ipcEvent: 'get-packages',
  cmd: ['list'],
  activeManager: 'yarn'
};

const mapState = state => ({
  mode: state.common.mode,
  directory: state.common.directory,
  packages: state.packages.packages
});

const Packages = props => {
  const { packages, mode, directory } = useMappedState(mapState);
  const dispatch = useDispatch();

  const [newPackages, error] = useIpc(
    'ipc-event',
    merge(options, {
      mode,
      directory
    })
  );

  if (error) {
    console.error(error);
  }

  useEffect(
    () => {
      if (typeof newPackages === 'string' && !Boolean(newPackages.length)) {
        return;
      }

      dispatch({ type: SET_PACKAGES, packages: newPackages });
    },
    [newPackages]
  );

  console.log(packages);

  return (
    <div className={panel} style={{ border: 'none' }}>
      <div className={panelHeader} />
      <div className={panelNav} />
      <div className={panelBody}>
        {/* {packages &&
          packages.map((pkg, idx) => (
            <Package key={`pkg-${idx}-key`} styles={styles} {...pkg} />
          ))} */}
      </div>
    </div>
  );
};

export default Packages;
