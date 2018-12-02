/* eslint-disable-no-unused-var */

import React, { useCallback, useEffect } from 'react';
import { merge } from 'ramda';
import { useMappedState, useDispatch, useReducer } from 'redux-react-hook';
import { SET_PACKAGES } from '../constants/ActionTypes';
import useIpc from '../commons/hooks/useIpc';
import styles from '../styles/spectre.min.css';
import { setupPackagesFromResponse } from '../utils/parse';

const { panel, 'panel-header': panelHeader, 'panel-body': panelBody } = styles;

const options = {
  ipcEvent: 'get-packages',
  cmd: ['outdated', 'list']
};

const mapState = state => ({
  packages: state.packages.packages
});

const Packages = props => {
  const { mode, directory } = props;

  const { packages } = useMappedState(mapState);
  const dispatch = useDispatch();
  const setPackages = useCallback(
    packages => dispatch({ type: SET_PACKAGES, packages }),
    [[]]
  );

  const [newPackages, error] = useIpc(
    'ipc-event',
    merge(options, {
      mode,
      directory
    })
  );

  useEffect(
    () => {
      const packages = setupPackagesFromResponse(newPackages);
      setPackages(packages);
    },
    [newPackages]
  );

  return (
    <div className={panel}>
      <div className={panelHeader}>Packages</div>
      <div className={panelBody} />
    </div>
  );
};

export default Packages;
