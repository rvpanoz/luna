/* eslint-disable */

/**
 * Packages component
 */

import { ipcRenderer, remote } from 'electron';
import React, { useEffect, useState, useCallback } from 'react';
import cn from 'classnames';
import { objectOf, object, func } from 'prop-types';
import { filter } from 'ramda';
import { withStyles } from '@material-ui/core';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import useIpc from 'commons/hooks/useIpc';
import { getFiltered, parseNpmError } from 'commons/utils';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from 'components/layout/SnackbarContent';

import AppLoader from '../layout/AppLoader';
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import PackageItem from './PackageItem';

import { listStyles as styles } from '../styles/packagesStyles';
import {
  addSelected,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  clearSelected
} from 'models/packages/actions';

import {
  addNotification,
  clearNotifications,
  setSnackbar,
  setPage,
  setPageRows,
  toggleLoader
} from 'models/ui/actions';

const installSelected = (manager, mode, directory, selected) => {
  ipcRenderer.send('ipc-event', {
    activeManager: manager,
    ipcEvent: 'install-packages',
    cmd: ['install'],
    multiple: true,
    packages: selected,
    mode,
    directory
  });
};

const uninstallSelected = (manager, mode, directory, selected) => {
  ipcRenderer.send('ipc-event', {
    activeManager: manager,
    ipcEvent: 'uninstall-packages',
    cmd: ['uninstall'],
    multiple: true,
    packages: selected,
    mode,
    directory
  });
};

const mapState = state => ({
  directory: state.common.directory,
  notifications: state.common.notifications,
  manager: state.common.manager,
  mode: state.common.mode,
  page: state.common.page,
  rowsPerPage: state.common.rowsPerPage,
  loader: state.common.loader,
  snackbarOptions: state.common.snackbarOptions,
  filters: state.packages.filters,
  packages: state.packages.packages,
  packagesOutdated: state.packages.packagesOutdated,
  selected: state.packages.selected,
  fromSearch: state.packages.fromSearch
});

const Packages = props => {
  const { classes } = props;

  const {
    loader: { loading, message },
    packages,
    mode,
    page,
    filters,
    rowsPerPage,
    directory,
    manager,
    selected,
    notifications,
    fromSearch,
    snackbarOptions
  } = useMappedState(mapState);

  const [sortDir, setSortDir] = useState('asc');
  const [sortBy, setSortBy] = useState('name');
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();

  const isSelected = name => selected.indexOf(name) !== -1;
  const clearSnackbar = () =>
    dispatch(
      setSnackbar({
        open: false,
        message: null
      })
    );

  const handleUninstall = () => {
    if (selected && selected.length) {
      remote.dialog.showMessageBox(
        remote.getCurrentWindow(),
        {
          title: 'Confirmation',
          type: 'question',
          message: 'Would you like to uninstall the selected packages?',
          buttons: ['Cancel', 'Uninstall']
        },
        btnIdx => {
          if (Boolean(btnIdx) === true) {
            uninstallSelected(manager, mode, directory, selected);
            dispatch(
              toggleLoader({
                loading: true,
                message: 'Uninstalling packages..'
              })
            );
          }
        }
      );
    }
    return false;
  };

  const handleInstall = () => {
    if (selected && selected.length) {
      remote.dialog.showMessageBox(
        remote.getCurrentWindow(),
        {
          title: 'Confirmation',
          type: 'question',
          message: 'Would you like to install the selected packages?',
          buttons: ['Cancel', 'Install']
        },
        btnIdx => {
          if (Boolean(btnIdx) === true) {
            installSelected(manager, mode, directory, selected);
            dispatch(
              toggleLoader({ loading: true, message: 'Installing packages..' })
            );
          }
        }
      );
    }
    return false;
  };

  // useIpc hook to send and listenTo ipc events
  const [dependenciesSet, outdatedSet, errors] = useIpc(
    'ipc-event',
    {
      ipcEvent: 'get-packages',
      cmd: ['outdated', 'list'],
      mode,
      directory
    },
    [manager, directory, counter]
  );

  const reload = () => setCounter(counter + 1);
  const setSelected = name => dispatch(addSelected({ name }));
  const toggleSort = prop => {
    const newSortBy = sortDir === 'desc' ? 'asc' : 'desc';

    setSortBy(prop);
    setSortDir(newSortBy);
  };

  // project name and version
  const { name, version } = dependenciesSet || {};
  const dependencies = dependenciesSet.data || [];
  const outdated = outdatedSet.data || [];

  // dispatch actions
  useEffect(
    () => {
      if (notifications && notifications.length) {
        dispatch(clearNotifications());
      }

      if (Array.isArray(dependencies) && dependencies.length) {
        dispatch(
          setPackagesSuccess({ data: dependencies, name, version, outdated })
        );
        dispatch(toggleLoader({ loading: false, message: null }));
      }

      if (outdated && outdated.length) {
        dispatch(
          setPackagesOutdatedSuccess({
            data: outdated
          })
        );
        dispatch(toggleLoader({ loading: false, message: null }));
      }

      if (errors && typeof errors === 'string') {
        const errorsArr = errors.split('\n');
        let errorsLen = errorsArr && errorsArr.length;

        while (errorsLen--) {
          if (errorsArr[errorsLen]) {
            const [body, requires, requiredBy] = parseNpmError(
              errorsArr[errorsLen]
            );

            dispatch(
              addNotification({
                level: 0,
                body,
                requires,
                requiredBy
              })
            );
          }
        }
      }

      if (page !== 0) {
        dispatch(setPage({ page: 0 }));
      }
    },
    [dependenciesSet]
  );

  // sort packages
  useEffect(
    () => {
      // clone dependencies
      const data = dependencies && dependencies.slice(0);

      if (!data || !data.length) {
        return;
      }

      const sortedData =
        sortDir === 'asc'
          ? data.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1))
          : data.sort((a, b) => (b[sortBy] < a[sortBy] ? -1 : 1));

      dispatch(
        setPackagesSuccess({ data: sortedData, fromSort: true, outdated })
      );
    },
    [sortDir, sortBy]
  );

  // actions listeners
  useEffect(
    () => {
      ipcRenderer.once(['action-close'], (event, error, data) => {
        reload();
        // dispatch(
        //   setSnackbar({
        //     open: true,
        //     type: 'success',
        //     message: data
        //   })
        // );
      });

      return () => ipcRenderer.removeAllListeners(['action-close']);
    },
    [counter]
  );

  // filter packages
  const filteredPackages =
    filters && filters.length ? getFiltered(packages, filters) : [];

  // assign final data
  const data =
    Array.isArray(filteredPackages) && filteredPackages.length
      ? filteredPackages
      : packages;

  // exclude packages with errors and peerMissing
  const packagesData = filter(pkg => {
    return !pkg.__peerMissing && !pkg.__error;
  }, data);

  // pagination
  const dataSlices =
    packagesData &&
    packagesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <AppLoader loading={loading} message={message}>
      <Paper className={classes.root}>
        <div className={classes.toolbar}>
          <TableToolbar
            title="Packages"
            manager={manager}
            mode={mode}
            directory={directory}
            selected={selected}
            fromSearch={fromSearch}
            reload={reload}
            handleInstall={handleInstall}
            handleUninstall={handleUninstall}
          />
        </div>
        <div className={classes.tableWrapper}>
          <Table
            aria-labelledby="packages-list"
            className={cn(classes.table, classes.tablelist, {
              [classes.hasFilterBlur]: loading
            })}
          >
            <TableHeader
              packages={dataSlices.map(d => d.name)}
              numSelected={Number(selected.length)}
              rowCount={(data && data.length) || 0}
              sortBy={sortBy}
              sortDir={sortDir}
              setSortBy={(e, prop) => setSortBy(prop)}
              toggleSort={(e, prop) => toggleSort(prop)}
              onSelected={(name, force) =>
                dispatch(
                  addSelected({
                    name,
                    force
                  })
                )
              }
              onClearSelected={() => dispatch(clearSelected())}
            />
            <TableBody>
              {dataSlices &&
                dataSlices.map(pkg => {
                  const { name, version, latest, isOutdated, __group } = pkg;

                  return (
                    <PackageItem
                      key={`pkg-${pkg.name}`}
                      isSelected={isSelected}
                      setSelected={setSelected}
                      name={name}
                      version={version}
                      latest={latest}
                      isOutdated={isOutdated}
                      __group={__group}
                    />
                  );
                })}
            </TableBody>
            <TableFooter
              rowCount={(packagesData && packagesData.length) || 0}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={(e, pageNo) =>
                dispatch(setPage({ page: pageNo }))
              }
              handleChangePageRows={e =>
                dispatch(setPageRows({ rowsPerPage: e.target.value || 10 }))
              }
            />
          </Table>
        </div>
      </Paper>
      {snackbarOptions && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={Boolean(snackbarOptions.open)}
          autoHideDuration={6000}
        >
          <SnackbarContent
            variant={snackbarOptions.type || 'info'}
            message={snackbarOptions.message}
            onClose={() =>
              setSnackbar({
                open: false,
                message: null
              })
            }
          />
        </Snackbar>
      )}
    </AppLoader>
  );
};

// Packages.propTypes = {
//   classes: objectOf.isRequired,
// };

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
