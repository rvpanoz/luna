/* eslint-disable-no-unused-var */

import React, { useCallback, useEffect } from 'react';
import { merge } from 'ramda';
import { useMappedState, useDispatch } from 'redux-react-hook';
import cn from 'classnames';
import Package from './Package';
import { SET_PACKAGES } from '../../constants/ActionTypes';
import useIpc from '../../commons/hooks/useIpc';
import styles from '../../styles/spectre.min.css';
import { setupPackagesFromResponse } from '../../utils/parse';

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
  cmd: ['outdated', 'list']
};

const mapState = state => ({
  packages: state.packages.packages
});

const Packages = props => {
  const { mode, directory } = props;
  const { packages } = useMappedState(mapState);
  const dispatch = useDispatch();

  // fetch new packages
  const [newPackages, error] = useIpc(
    'ipc-event',
    merge(options, {
      mode,
      directory
    })
  );

  // create a memoized callback - that only changes if packages has changed, second param
  const setPackages = useCallback(
    data => dispatch({ type: SET_PACKAGES, packages: data }),
    [newPackages]
  );

  // update packages
  useEffect(
    () => {
      const completedPackages = setupPackagesFromResponse(newPackages);
      setPackages(completedPackages);
    },
    [packages]
  );

  return (
    <div className={panel} style={{ border: 'none' }}>
      <div className={panelHeader} />
      <div className={panelNav} />
      <div className={panelBody}>
        {packages &&
          packages.map(pkg => (
            <Package key={`pkg-${pkg.current}-key`} styles={styles} {...pkg} />
          ))}
      </div>
    </div>
  );
};

export default Packages;
