/* eslint-disable-no-unused-var */

import React, { useCallback, useEffect } from 'react';
import { merge } from 'ramda';
import { useMappedState, useDispatch } from 'redux-react-hook';
import cn from 'classnames';
import ActionsBar from './ActionsBar';
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
  const setPackages = useCallback(
    packages => dispatch({ type: SET_PACKAGES, packages }),
    [packages]
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
    <div className={panel} style={{ border: 'none' }}>
      <div className={panelHeader}>
        <ActionsBar />
      </div>
      <div className={panelNav}>
        <ul className={cn(tab, tabBlock)}>
          <li
            className={cn(tabItem, {
              [active]: true
            })}
          >
            <a className={textLight} href="#">
              Dependencies
            </a>
          </li>
          <li
            className={cn(tabItem, {
              [active]: false
            })}
          >
            <a href="#">Dependencies</a>
          </li>
        </ul>
      </div>
      <div className={panelBody} />
    </div>
  );
};

export default Packages;
