import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { useFilters } from '../commons/hooks';
import { scrollWrapper, iMessage } from '../commons/utils';
import {
  setPackagesStart,
  viewPackageStart,
  installPackage,
  installMultiplePackages
} from '../models/packages/actions';
import {
  addSelected,
  setPage,
  setPageRows,
  setActivePage
} from '../models/ui/actions';
import { setMode, clearInstallOptions } from '../models/common/actions';
import {
  ToolbarView,
  HeaderView,
  PaginationView,
  PackageItemView,
  DialogOptionsView
} from '../components/views/packages';
import Toolbar from './Toolbar';
import Pagination from './Pagination';
import AppLoader from './AppLoader';
import { AppState } from '../state';
import PackageItem from '../components/Package';

const mapState = ({
  common: {
    directory,
    manager,
    mode,
    operations: { packagesInstallOptions, action }
  },
  packages: {
    active,
    packagesFromSearch,
    packagesData,
    packagesOutdated,
    metadata: { fromSearch }
  },
  npm: { operationStatus, operationPackages, operationCommand },
  ui: {
    paused,
    loaders: { loader, packageLoader },
    pagination: { page, rowsPerPage },
    filtering: { filters },
    sorting: { sortBy, sortDir },
    selected
  }
}: AppState) => ({
  paused,
  active,
  directory,
  manager,
  mode,
  page,
  rowsPerPage,
  loader,
  packageLoader,
  action,
  filters,
  packagesFromSearch,
  packagesData,
  packagesOutdated,
  selected,
  packagesInstallOptions,
  fromSearch,
  sortDir,
  sortBy,
  operationStatus,
  operationPackages,
  operationCommand
});

const Packages = () => {
  const {
    loader: { loading, message },
    packagesFromSearch,
    packagesData,
    packagesOutdated,
    mode,
    page,
    filters,
    rowsPerPage,
    directory,
    selected,
    fromSearch,
    sortDir,
    sortBy,
    packagesInstallOptions,
    active,
    operationStatus,
    operationPackages,
    operationCommand,
  } = useMappedState(mapState);

  const [options, toggleOptions] = useState({
    open: false,
    single: false,
    name: null,
    version: null
  });
  const [filteredByNamePackages, setFilteredByNamePackages] = useState([]);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  const reload = useCallback(() => {
    dispatch(setActivePage({ page: 'packages', paused: false }));
    dispatch(
      setPackagesStart({
        channel: 'npm-list-outdated',
        options: {
          cmd: ['outdated', 'list']
        }
      })
    );
  }, [dispatch]);

  const switchModeHandler = useCallback((appMode, appDirectory) => {
    dispatch(setMode({ mode: appMode, directory: appDirectory }));
    dispatch(setActivePage({ page: 'packages', paused: false }));

    if (fromSearch) {
      dispatch(
        setPackagesStart({
          channel: 'npm-list-outdated',
          options: {
            cmd: ['outdated', 'list']
          }
        })
      );
    }
  }, [dispatch, fromSearch]);

  const viewPackageHandler = useCallback((name, version) => {
    return dispatch(
      viewPackageStart({
        channel: 'npm-view',
        options: {
          cmd: ['view'],
          name,
          version: name === 'npm' ? null : version
        }
      }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setPackagesStart({
        channel: 'npm-list-outdated',
        options: {
          cmd: ['outdated', 'list'],
          mode,
          directory
        }
      })
    );
  }, [mode, directory, dispatch]);

  const activePackages = fromSearch ? packagesFromSearch : packagesData;
  const [filteredPackages] = useFilters(activePackages, filters);

  const data = filteredByNamePackages.length
    ? filteredByNamePackages
    : filteredPackages;

  const dataSlices =
    data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const listDataPackages =
    sortDir === 'asc'
      ? dataSlices.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1))
      : dataSlices.sort((a, b) => (b[sortBy] < a[sortBy] ? -1 : 1));

  const noPackages = Boolean(!packagesData || !packagesData.length) && !fromSearch

  if (noPackages) {
    return <div>No packages found.</div>
  }

  return (
    <AppLoader loading={loading}>
      <div className="flex">
        <div className="w-2/3 flex flex-col">
          <div className="pb-2">
            <Toolbar />
          </div>
          <table className="min-w-full divide-y divide-gray-200 border-l leading-normal">
            <thead>
              <tr>
                <th className="px-2 py-2 border-t border-l border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Package</th>
                <th className="px-2 py-2 border-t border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Installed</th>
                <th className="px-2 py-2 border-t border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Latest</th>
                <th className="px-2 py-2 border-t border-r border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {listDataPackages &&
                listDataPackages.map(
                  ({
                    name,
                    version,
                    latest,
                    isOutdated,
                    peerDependencies,
                    extraneous,
                    problems,
                    missing,
                    peerMissing,
                    __fromSearch,
                    __hasError,
                    __group
                  }) => {
                    const isPackageSelected = selected.indexOf(name) > -1;
                    const installOptions = Array.isArray(packagesInstallOptions)
                      ? packagesInstallOptions.find(
                        installOption => installOption.name === name
                      )
                      : {};

                    const inOperation =
                      operationStatus !== 'idle' &&
                      operationCommand !== 'install' &&
                      operationPackages.indexOf(name) > -1;

                    return <PackageItem
                      key={name}
                      name={name}
                      version={version}
                      latest={latest}
                      peerMissing={peerMissing}
                      missing={missing}
                      isOutdated={isOutdated}
                      inOperation={inOperation}
                      onClick={() => viewPackageHandler(name, version)} />
                  }
                )}
            </tbody>
          </table>
        </div>
        <div className="w-1/3 pt-16 pl-2">
          details..
      </div>
      </div>
    </AppLoader>
  );
};
export default Packages;
