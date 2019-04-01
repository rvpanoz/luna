/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */

import { ipcRenderer } from 'electron';
import React, { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { pickBy } from 'ramda';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';

import useIpc from 'commons/hooks/useIpc';
import useFilters from 'commons/hooks/useFilters';
import AppLoader from 'components/common/AppLoader';

import {
  addSelected,
  addInstallOption,
  updateData,
  setPage,
  setPageRows,
  setPackagesStart,
  viewPackage,
  setActive,
  removePackages
} from 'models/packages/actions';
import {
  commandMessage,
  toggleLoader,
  togglePackageLoader,
  setSnackbar,
  clearRunningCommand,
  setMode
} from 'models/ui/actions';
import { PackageDetails } from 'components/pages/package';

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
    loader,
    npm: { paused, operationStatus, operationPackages, operationCommand }
  },
  modules: {
    active,
    data: { packages, packagesOutdated },
    operations: { action, selected, packagesInstallOptions },
    pagination: { page, rowsPerPage },
    filtering: { filters },
    metadata: { fromSearch },
    sorting: { sortBy, sortDir }
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
  packages,
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
    packages,
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
    paused,
    forceUpdate
  };

  const [dependenciesSet, outdatedSet, commandErrors] = useIpc(
    IPC_EVENT,
    parameters,
    [mode, directory, forceUpdate]
  );

  const { projectName, projectVersion } = dependenciesSet || {};

  const dependencies = dependenciesSet.data;
  const outdated = outdatedSet.data;

  const startPackages = () =>
    dispatch(
      setPackagesStart({
        channel: IPC_EVENT,
        options: {
          ...parameters
        }
      })
    );

  const switchMode = (appMode, appDirectory) => {
    dispatch(setMode({ mode: appMode, directory: appDirectory }));

    if (fromSearch) {
      reload();
    }
  };

  useEffect(() => {
    if (paused) {
      return;
    }

    if (commandErrors) {
      dispatch({
        type: commandMessage.type,
        payload: { error: commandErrors }
      });
    }

    dispatch(
      updateData({
        dependencies: forceUpdate ? packages : dependencies,
        outdated: forceUpdate ? packagesOutdated : outdated,
        projectName,
        projectVersion
      })
    );
  }, [dependenciesSet]);

  useEffect(() => {
    ipcRenderer.on('action-close', (event, error, cliMessage, options) => {
      const operation = options && options[0];
      const argv = options && options[1];

      if (error && error.length) {
        console.error(error);
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
          setforceUpdate(forceUpdate + 1);
        }
      }

      dispatch(clearRunningCommand());

      dispatch(
        setSnackbar({
          open: true,
          type: 'info',
          message: cliMessage
        })
      );

      dispatch(
        toggleLoader({
          loading: false,
          message: null
        })
      );
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
        throw new Error(err);
      }
    });

    return () =>
      ['action-close', 'view-close'].forEach(listener =>
        ipcRenderer.removeAllListeners(listener)
      );
  }, [forceUpdate]);

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

  // setup packages
  const [packagesData] = useFilters(packages, filters);

  const data = filteredByNamePackages.length
    ? filteredByNamePackages
    : packagesData;

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
                reload={() => startPackages()}
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
                    rowCount={packagesData && packagesData.length}
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
