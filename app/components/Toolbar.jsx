import React, { useCallback } from 'react';
import {
  SyncIcon,
  FilterIcon,
  ListUnorderedIcon,
  TrashIcon,
  PlusIcon,
} from '@primer/octicons-react';
import { useDispatch } from 'redux-react-hook';
import { string, array, func } from 'prop-types';
import { PACKAGE_GROUPS } from '../constants/AppConstants';
import {
  installPackage,
  updatePackages,
  installMultiplePackages,
  uninstallPackages,
} from '../models/packages/actions';

const Toolbar = (props) => {
  const dispatch = useDispatch();
  const { mode, selected, packagesData, reload, switchMode } = props;

  const onInstall = useCallback(() => {
    let pkgOptions = [],
      latest = true;

    if (mode === 'local') {
      pkgOptions = selected.map((packageName) => {
        const packageDetails = packagesData.find(
          (packageDataDetails) => packageDataDetails.name === packageName
        );
        const { __group } = packageDetails;

        return [PACKAGE_GROUPS[__group]];
      });
    }

    return dispatch(
      installMultiplePackages({
        ipcEvent: 'npm-install',
        cmd: selected.map(() => 'install'),
        multiple: true,
        pkgOptions: mode === 'local' ? pkgOptions : null,
        packages: latest
          ? selected.map((selectedPackage) => `${selectedPackage}@latest`)
          : selected,
      })
    );
  }, [selected, dispatch]);

  const onUpdate = useCallback(
    () =>
      dispatch(
        updatePackages({
          ipcEvent: 'npm-update',
          cmd: ['update'],
          multiple: true,
          packages: selected,
        })
      ),
    [selected, dispatch]
  );

  const onUninstall = useCallback(
    () =>
      dispatch(
        uninstallPackages({
          ipcEvent: 'npm-uninstall',
          cmd: ['uninstall'],
          multiple: true,
          packages: selected,
        })
      ),
    [selected, dispatch]
  );

  const renderActions = () => {
    return (
      <div className="flex items-center justify-between flex-wrap">
        <div>
          <a
            onClick={() => onInstall()}
            href="#"
            className="inline-block text-sm px-4 py-2 leading-none text-green-600"
          >
            <PlusIcon />
          </a>
        </div>
        <div className="ml-2">
          <a
            onClick={() => onUpdate()}
            href="#"
            className="inline-block text-sm px-4 py-2 leading-none text-blue-600"
          >
            <SyncIcon />
          </a>
        </div>
        <div className="ml-2">
          <a
            onClick={() => onUninstall()}
            href="#"
            className="inline-block text-sm px-4 py-2leading-none text-red-600"
          >
            <TrashIcon />
          </a>
        </div>
      </div>
    );
  };

  const renderItems = () => {
    return (
      <div className="flex items-center justify-between flex-wrap">
        <div>
          <button className="bg-gray-200 hover:bg-gray-400 py-1 px-4 rounded inline-flex items-center">
            <FilterIcon />
            &nbsp;
            <span className="ml-1 text-gray-600 text-sm">Show filters</span>
          </button>
        </div>
        <div className="ml-2">
          <button
            onClick={() => switchMode('global', null)}
            className="bg-gray-200 hover:bg-gray-400 py-1 px-4 rounded inline-flex items-center"
          >
            <ListUnorderedIcon />
            &nbsp;
            <span className="ml-1 text-gray-600 text-sm">Load globals</span>
          </button>
        </div>
        <div className="ml-2">
          <button
            onClick={() => reload()}
            className="bg-gray-200 hover:bg-gray-400 py-1 px-4 rounded inline-flex items-center"
          >
            <SyncIcon />
            &nbsp;<span className="ml-1 text-gray-600 text-sm">Reload</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <nav className="flex justify-between bg-gray-100">
      <div className="mr-2">
        <h3 className="text-gray-600 text-bold mt-2">
          Packages&nbsp;{selected.length ? `(${selected.length})` : null}
        </h3>
      </div>
      {selected.length ? renderActions() : renderItems()}
    </nav>
  );
};

Toolbar.propTypes = {
  mode: string,
  selected: array,
  packagesData: array,
  switchMode: func,
  reload: func,
};

export default Toolbar;
