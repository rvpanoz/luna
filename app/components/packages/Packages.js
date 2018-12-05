/* eslint-disable-no-unused-var */

import React, { useCallback, useEffect } from 'react';
import { merge } from 'ramda';
import { useMappedState, useDispatch } from 'redux-react-hook';
import cn from 'classnames';
import Package from './Package';
import { SET_PACKAGES } from '../../constants/ActionTypes';
import useIpc from '../../commons/hooks/useIpc';
import styles from '../../styles/spectre.min.css';

const {
  active,
  panel,
  tab,
  'panel-header': panelHeader,
  'panel-body': panelBody,
  'panel-nav': panelNav,
  'tab-block': tabBlock,
  'tab-item': tabItem,
  'text-light': textLight,
  'text-dark': textDark
} = styles;

const options = {
  ipcEvent: 'get-packages',
  cmd: ['list']
};

const mapState = state => ({
  packages: state.packages.packages
});

const Packages = props => {
  const { mode, directory } = props;

  const { packages } = useMappedState(mapState);
  const dispatch = useDispatch();

  const [newPackages, error] = useIpc(
    'ipc-event',
    merge(options, {
      mode,
      directory
    })
  );

  useEffect(
    () => {
      //ignore empty respone
      if (typeof newPackages === 'string' && !Boolean(newPackages.length)) {
        return;
      }

      dispatch({ type: SET_PACKAGES, packages: newPackages });
    },
    [newPackages]
  );

  console.log(packages);
  return null;

  return (
    <div className={panel} style={{ border: 'none' }}>
      <div className={panelHeader} />
      <div className={panelNav} />
      <div className={panelBody}>
        {packages &&
          packages.map((pkg, idx) => (
            <Package key={`pkg-${idx}-key`} styles={styles} {...pkg} />
          ))}
      </div>
    </div>
  );
};

export default Packages;
