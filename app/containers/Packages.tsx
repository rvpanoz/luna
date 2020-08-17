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
}) => ({
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

  return (
    <div className="flex flex-col">
      <Toolbar />
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Package</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Installed</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Latest</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
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
                const isPackageSelected =
                  selected.indexOf(name) > -1;
                const installOptions = Array.isArray(
                  packagesInstallOptions
                )
                  ? packagesInstallOptions.find(
                    installOption => installOption.name === name
                  )
                  : {};

                const inOperation =
                  operationStatus !== 'idle' &&
                  operationCommand !== 'install' &&
                  operationPackages.indexOf(name) > -1;

                return (
                  <tr key={name}>
                    <td className="px-2 py-2 border-b border-gray-200 bg-white text-md">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <label className="inline-flex items-center mt-3">
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-red-600" />
                            <span className="ml-2 text-gray-900 whitespace-no-wrap">
                              {name}
                            </span>
                          </label>

                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2 border-b border-gray-200 bg-white text-md">{version}</td>
                    <td className="px-2 py-2 border-b border-gray-200 bg-white text-md">{latest}</td>
                    <td className="px-2 py-2 border-b border-gray-200 bg-white text-md">
                      {missing && <i className="fa fa-error" />}
                      {isOutdated && (
                        <i className="fa fa-warn" />
                      )}
                      {!isOutdated && !peerMissing && !missing && version ? (
                        <span
                          className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                          </span>
                          <span className="relative"><i className="fa fa-check" /></span>
                        </span>
                      ) : null}
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
};
export default Packages;
