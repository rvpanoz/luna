import React, { useCallback } from 'react';
import {
  SyncIcon,
  FilterIcon,
  ListUnorderedIcon,
  TrashIcon,
  PlusIcon,
} from '@primer/octicons-react';
import { useDispatch } from 'redux-react-hook';
import { bool, string, array, func } from 'prop-types';
import { PACKAGE_GROUPS } from '../constants/AppConstants';
import {
  installPackage,
  updatePackages,
  installMultiplePackages,
  uninstallPackages,
} from '../models/packages/actions';

const Toolbar = (props) => {
  const dispatch = useDispatch();
  const {
    mode,
    selected,
    fromSearch,
    packagesData,
    reload,
    setModalOptions,
    switchMode,
  } = props;

  const onInstall = useCallback(() => {
    if (mode === 'local') {
      setModalOptions(true, 'Installation options', 'options');
    }

    // let pkgOptions = [],
    //   latest = true;

    // if (mode === 'local') {
    //   pkgOptions = selected.map((packageName) => {
    //     const packageDetails = packagesData.find(
    //       (packageDataDetails) => packageDataDetails.name === packageName
    //     );
    //     const { __group } = packageDetails;

    //     return [PACKAGE_GROUPS[__group]];
    //   });
    // }

    // dispatch(
    //   installMultiplePackages({
    //     ipcEvent: 'npm-install',
    //     cmd: selected.map(() => 'install'),
    //     multiple: true,
    //     pkgOptions: mode === 'local' ? pkgOptions : null,
    //     packages: latest
    //       ? selected.map((selectedPackage) => `${selectedPackage}@latest`)
    //       : selected,
    //   })
    // );
  }, [selected, dispatch]);

  const onUpdate = useCallback(() => {
    dispatch(
      updatePackages({
        ipcEvent: 'npm-update',
        cmd: ['update'],
        multiple: true,
        packages: selected,
      })
    );
  }, [selected, dispatch]);

  const onUninstall = useCallback(() => {
    dispatch(
      uninstallPackages({
        ipcEvent: 'npm-uninstall',
        cmd: ['uninstall'],
        multiple: true,
        packages: selected,
      })
    );
  }, [selected, dispatch]);

  const renderNpmActions = () => {
    return (
      <div className="flex items-center justify-between flex-wrap">
        <div>
          <button
            onClick={() => onInstall()}
            className="bg-gray-100 hover:bg-gray-200 py-1 px-4 rounded inline-flex items-center"
          >
            <PlusIcon />
            &nbsp;
            <span className="ml-1 text-gray-600 text-sm">Install</span>
          </button>
        </div>
        <div className="ml-2">
          <button
            onClick={() => onUpdate()}
            className="bg-gray-100 hover:bg-gray-200 py-1 px-4 rounded inline-flex items-center"
          >
            <SyncIcon />
            &nbsp;
            <span className="ml-1 text-gray-600 text-sm">Update</span>
          </button>
        </div>
        <div className="ml-2">
          <button
            onClick={() => onUninstall()}
            className="bg-gray-100 hover:bg-gray-200 py-1 px-4 rounded inline-flex items-center"
          >
            <TrashIcon />
            &nbsp;
            <span className="ml-1 text-gray-600 text-sm">Uninstall</span>
          </button>
        </div>
      </div>
    );
  };

  const renderListActions = () => {
    return (
      <div className="flex items-center justify-between flex-wrap">
        <div>
          <button className="bg-gray-100 hover:bg-gray-200 py-1 px-4 rounded inline-flex items-center">
            <FilterIcon />
            &nbsp;
            <span className="ml-1 text-gray-600 text-sm">Show filters</span>
          </button>
        </div>
        <div className="ml-2">
          <button
            onClick={() => reload()}
            className="bg-gray-100 hover:bg-gray-200 py-1 px-4 rounded inline-flex items-center"
          >
            <SyncIcon />
            &nbsp;<span className="ml-1 text-gray-600 text-sm">Reload</span>
          </button>
        </div>
        <div className="ml-2">
          <button
            onClick={() => switchMode('global', null)}
            className="bg-gray-100 hover:bg-gray-200 py-1 px-4 rounded inline-flex items-center"
          >
            <ListUnorderedIcon />
            &nbsp;
            <span className="ml-1 text-gray-600 text-sm">Load globals</span>
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
      {selected.length ? renderNpmActions() : renderListActions()}
    </nav>
  );
};

Toolbar.propTypes = {
  mode: string,
  selected: array,
  packagesData: array,
  switchMode: func,
  reload: func,
  setModalOptions: func,
  fromSearch: bool,
};

export default Toolbar;
