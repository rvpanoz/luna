import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { useFilters } from '../commons/hooks';
// import { scrollWrapper, iMessage } from '../commons/utils';
import {
  setPackagesStart,
  viewPackageStart,
  installPackage,
  uninstallPackages,
  updatePackages,
  installMultiplePackages
} from '../models/packages/actions';
import {
  addSelected,
  setPage,
  setActivePage,
} from '../models/ui/actions';
import { setMode, clearInstallOptions } from '../models/common/actions';
import Toolbar from '../components/Toolbar';
import Pagination from '../components/Pagination';
import AppLoader from '../components/AppLoader';
import { AppState } from '../state';
import PackageItem from '../components/Package';
import PackageDetails from '../components/PackageDetails';

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
  const [activeGroup, setActiveGroup] = useState();
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

  const switchMode = useCallback((mode, directory) => {
    dispatch(setMode({ mode, directory }));
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

  const viewPackage = useCallback((name, version) => {
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

  const setSelected = useCallback((name) => dispatch(addSelected({ name })), [dispatch]);
  const updatePage = useCallback((page) => dispatch(setPage({ page })), [dispatch]);

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

  useEffect(() => {
    if (mode === 'local' && active) {
      const packageItem = mode === 'local' && active
        ? packagesData.find((pkg: any) => pkg.name === active.name)
        : null;

      if (packageItem && packageItem.__group) {
        setActiveGroup(packageItem.__group);
      }
    }
  }, [active, mode, packagesData]);

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
    <AppLoader loading={loading}>
      {noPackages ? <div>No packages found.</div> :
        <div className="flex">
          <div className="w-2/3 flex flex-col">
            <div className="pb-2">
              <Toolbar reload={reload} switchMode={switchMode} selected={selected} mode={mode} packagesData={packagesData} />
            </div>
            <table className="min-w-full divide-y divide-gray-200 border-l">
              <thead>
                <tr>
                  <th className="px-2 py-2 border-t border-l border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 tracking-wider">Name</th>
                  <th className="px-2 py-2 border-t border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 tracking-wider">Installed</th>
                  <th className="px-2 py-2 border-t border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 tracking-wider">Latest</th>
                  <th className="px-2 py-2 border-t border-r border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 tracking-wider">Status</th>
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
                        onClick={() => viewPackage(name, version)}
                        onSelect={setSelected} />
                    }
                  )}
              </tbody>
            </table>
            <div className="pt-2">
              <Pagination totalRecords={data.length} currentPage={page} pageLimit={rowsPerPage} handleChangePage={updatePage} />
            </div>
          </div>
          <div className="w-1/3 pt-24 pl-2">
            <PackageDetails active={active} activeGroup={activeGroup} />
          </div>
        </div>
      }
    </AppLoader>
  );
};
export default Packages;
