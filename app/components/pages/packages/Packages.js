/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */

import { ipcRenderer } from 'electron';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { pickBy } from 'ramda';
import { FATAL_ERROR } from 'constants/AppConstants';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';

import useIpc from 'commons/hooks/useIpc';
import useFilters from 'commons/hooks/useFilters';
import AppLoader from 'components/common/AppLoader';
import { PackageDetails } from 'components/pages/package';

import {
  updateData,
  setPackagesStart,
  setActive,
  viewPackage,
  removePackages,
  clearPackages
} from 'models/packages/actions';

import {
  addSelected,
  toggleLoader,
  togglePackageLoader,
  setSnackbar,
  setPage,
  setPageRows,
  setActivePage,
  clearSelected
} from 'models/ui/actions';

import { updateNotifications } from 'models/notifications/actions';
import { clearRunningCommand } from 'models/npm/actions';
import { setMode, addInstallOption } from 'models/common/actions';

import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import PackageItem from './PackageItem';

import styles from './styles/packages';

const mapState = ({
  common: {
    directory,
    manager,
    mode,
    operations: { packagesInstallOptions, action }
  },
  packages: {
    active,
    packagesData,
    packagesOutdated,
    metadata: { fromSearch }
  },
  npm: { operationStatus, operationPackages, operationCommand },
  ui: {
    paused,
    loaders: { loader },
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
  action,
  filters,
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

const IPC_EVENT = 'ipc-event';

const Packages = ({ classes }) => {
  const {
    loader: { loading, message },
    packagesData,
    packagesOutdated,
    mode,
    page,
    filters,
    rowsPerPage,
    directory,
    manager,
    selected,
    fromSearch,
    sortDir,
    sortBy,
    packagesInstallOptions,
    paused,
    active,
    operationStatus,
    operationPackages,
    operationCommand
  } = useMappedState(mapState);

  const [forceUpdate, setforceUpdate] = useState(0);
  const [filteredByNamePackages, setFilteredByNamePackages] = useState([]);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  const parameters = {
    ipcEvent: 'get-packages',
    cmd: ['outdated', 'list'],
    mode,
    directory,
    paused
  };

  const fetchPackages = useCallback(() => {
    dispatch({
      type: setActivePage.type,
      payload: {
        page: 'packages',
        paused: false
      }
    });
    dispatch(
      setPackagesStart({
        channel: IPC_EVENT,
        options: {
          ...parameters
        }
      })
    );
  }, [parameters, dispatch]);

  const switchMode = (appMode, appDirectory) => {
    dispatch(setActivePage({ page: 'packages', paused: false }));
    dispatch(setMode({ mode: appMode, directory: appDirectory }));

    if (fromSearch) {
      fetchPackages();
    }
  };

  const scrollWrapper = top => {
    const wrapperEl = wrapperRef && wrapperRef.current;

    wrapperEl &&
      wrapperEl.scroll({
        top,
        behavior: 'smooth'
      });
  };

  const viewPackageHandler = (name, version) => {
    const viewParameters = {
      activeManager: manager,
      ipcEvent: 'view',
      cmd: ['view'],
      name,
      version,
      mode,
      directory
    };

    dispatch({
      type: viewPackage.type,
      payload: viewParameters
    });
  };

  const [dependenciesSet, outdatedSet, problems] = useIpc(
    IPC_EVENT,
    parameters,
    [mode, directory]
  );

  useEffect(() => {
    const dependencies = dependenciesSet.data;
    const outdated = outdatedSet.data;

    if (paused) {
      return;
    }

    // handle empty dependencies
    if (!dependencies || !dependencies.length) {
      dispatch(clearPackages());
      dispatch(
        toggleLoader({
          loading: false,
          message: null
        })
      );

      return;
    }

    if (problems && problems.length) {
      dispatch(
        updateNotifications({
          notifications: problems
        })
      );
    }

    // project info
    const { projectName, projectVersion, projectDescription } =
      dependenciesSet || {};

    dispatch(
      updateData({
        dependencies,
        outdated,
        projectName,
        projectVersion,
        projectDescription
      })
    );
  }, [dependenciesSet, outdatedSet.data, paused, problems, dispatch]);

  useEffect(() => {
    ipcRenderer.on('action-close', (event, output, cliMessage, options) => {
      const [operation, argv] = options;
      const errorMessages = [];

      // clean up first
      dispatch(clearRunningCommand());
      dispatch(clearSelected());
      dispatch(
        setActive({
          active: null
        })
      );

      if (output && typeof output === 'string') {
        const outputParts = output.split('\n');

        errorMessages.concat(
          outputParts.filter(outputPart => outputPart.indexOf('npm ERR!') === 0)
        );
      }

      if (operation === 'uninstall') {
        const removedOrUpdatedPackages =
          options &&
          options.filter(
            option =>
              option.indexOf(operation) === -1 &&
              option.indexOf(argv) === -1 &&
              option.indexOf('-g') === -1
          );

        if (removedOrUpdatedPackages && removedOrUpdatedPackages.length) {
          dispatch(
            removePackages({ removedPackages: removedOrUpdatedPackages })
          );

          // update packages without fetching
          setforceUpdate(forceUpdate + 1);

          dispatch(
            setSnackbar({
              open: true,
              type: errorMessages.length ? 'error' : 'info',
              message: errorMessages.length
                ? `Packages removed with errors \n${errorMessages[1]}\n${
                    errorMessages[2]
                  }`
                : 'Packages removed'
            })
          );

          dispatch(
            toggleLoader({
              loading: false,
              message: null
            })
          );
        }

        return;
      }

      dispatch(
        setSnackbar({
          open: true,
          type: errorMessages.length ? 'error' : 'info',
          message: errorMessages.length
            ? `Packages updated with errors \n${errorMessages[1]}\n${
                errorMessages[2]
              }`
            : 'Packages updated'
        })
      );

      fetchPackages();
    });

    ipcRenderer.on('view-close', (event, status, cmd, data) => {
      try {
        const newActive = data && JSON.parse(data);
        const getCleanProps = (val, key) => /^[^_]/.test(key);
        const properties = pickBy(getCleanProps, newActive);

        dispatch(setActive({ active: properties }));
        dispatch(
          togglePackageLoader({
            loading: false
          })
        );
      } catch (err) {
        setSnackbar({
          open: true,
          type: 'error',
          message: err.message || FATAL_ERROR
        });
      }
    });

    return () =>
      ['action-close', 'view-close'].forEach(listener =>
        ipcRenderer.removeAllListeners(listener)
      );
  }, [forceUpdate, dispatch, fetchPackages, packagesData, packagesOutdated]);

  // setup packages
  const [filteredPackages] = useFilters(packagesData, filters);

  const data = filteredByNamePackages.length
    ? filteredByNamePackages
    : filteredPackages;

  // pagination
  const dataSlices =
    data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // sorting
  const listDataPackages =
    sortDir === 'asc'
      ? dataSlices.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1))
      : dataSlices.sort((a, b) => (b[sortBy] < a[sortBy] ? -1 : 1));

  return (
    <AppLoader loading={loading} message={message}>
      <Grid container>
        <Grid
          item
          md={active ? 8 : 11}
          lg={active ? 8 : 11}
          xl={active ? 8 : 11}
          className={classes.transition}
        >
          <Paper className={classes.root}>
            <div className={classes.toolbar}>
              <TableToolbar
                title="Packages"
                manager={manager}
                listDataPackages={listDataPackages}
                mode={mode}
                directory={directory}
                selected={selected}
                outdated={packagesOutdated}
                packagesInstallOptions={packagesInstallOptions}
                fromSearch={fromSearch}
                filters={filters}
                scrollWrapper={scrollWrapper}
                switchMode={switchMode}
                reload={fetchPackages}
                filteredByNamePackages={filteredByNamePackages}
                setFilteredByNamePackages={setFilteredByNamePackages}
              />
            </div>
            <div className={classes.tableWrapper} ref={wrapperRef}>
              {packagesData.length === 0 ? (
                <Typography variant="subtitle1" className={classes.withPadding}>
                  No dependencies found.
                </Typography>
              ) : (
                <Table
                  padding="dense"
                  aria-labelledby="packages-list"
                  className={cn(classes.table, {
                    [classes.hasFilterBlur]: loading
                  })}
                >
                  <TableHeader
                    packages={dataSlices.map(d => d.name)}
                    numSelected={selected.length}
                    rowCount={dataSlices && dataSlices.length}
                    sortBy={sortBy}
                    sortDir={sortDir}
                  />
                  <TableBody>
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
                          __group
                        }) => {
                          const isPackageSelected = selected.indexOf(name) > -1;
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
                            <PackageItem
                              key={`pkg-${name}`}
                              isSelected={isPackageSelected}
                              installOptions={installOptions}
                              addSelected={() =>
                                dispatch(addSelected({ name }))
                              }
                              addInstallOption={(pkgName, options) =>
                                dispatch(
                                  addInstallOption({ name: pkgName, options })
                                )
                              }
                              name={name}
                              peerDependencies={peerDependencies}
                              latest={latest}
                              version={version}
                              mode={mode}
                              missing={missing}
                              isOutdated={isOutdated}
                              fromSearch={fromSearch}
                              group={__group}
                              extraneous={extraneous}
                              problems={problems}
                              viewPackage={viewPackageHandler}
                              inOperation={inOperation}
                            />
                          );
                        }
                      )}
                  </TableBody>
                  <TableFooter
                    rowCount={data && data.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={(e, pageNo) => {
                      scrollWrapper(0);
                      dispatch(setPage({ page: pageNo }));
                    }}
                    handleChangePageRows={e =>
                      dispatch(setPageRows({ rowsPerPage: e.target.value }))
                    }
                  />
                </Table>
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item md={active ? 4 : 1} lg={active ? 4 : 1} xl={active ? 4 : 1}>
          <PackageDetails />
        </Grid>
      </Grid>
    </AppLoader>
  );
};

Packages.propTypes = {
  classes: objectOf(string).isRequired
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
