/* eslint-disable */

/**
 * Packages component
 */

import { ipcRenderer } from 'electron';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
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

import {
  addActionError,
  addSelected,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  clearSelected,
  clearPackages
} from 'models/packages/actions';

import {
  addNotification,
  clearNotifications,
  clearSnackbar,
  setSnackbar,
  setPage,
  setPageRows,
  toggleLoader
} from 'models/ui/actions';

import { WARNING_MESSAGES } from 'constants/AppConstants';
import { listStyles as styles } from '../styles/packagesStyles';

// use useCallback if you need it inside component body
// const mapState = useCallback(state=>({
//   directory: state.common.directory
// }),[input])

const mapState = state => ({
  directory: state.common.directory,
  notifications: state.common.notifications,
  manager: state.common.manager,
  mode: state.common.mode,
  page: state.common.page,
  rowsPerPage: state.common.rowsPerPage,
  loader: state.common.loader,
  snackbarOptions: state.common.snackbarOptions,
  action: state.packages.action,
  filters: state.packages.filters,
  packages: state.packages.packages,
  packagesOutdated: state.packages.packagesOutdated,
  selected: state.packages.selected,
  fromSearch: state.packages.fromSearch
});

const Packages = props => {
  const { classes } = props;

  const {
    action: { actionName, actionError },
    loader: { loading, message },
    packages,
    mode,
    page,
    filters,
    rowsPerPage,
    directory,
    manager,
    selected,
    fromSearch,
    snackbarOptions
  } = useMappedState(mapState);

  const [sortOptions, setSort] = useState({
    direction: 'asc',
    prop: 'name'
  });

  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const clearUI = () => {
    dispatch(clearPackages());
    dispatch(clearNotifications());
    // dispatch(clearSnackbar());
  };

  const isSelected = name => selected.indexOf(name) !== -1;

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
  const closeSnackbar = () =>
    dispatch(
      setSnackbar({
        open: false,
        message: null
      })
    );
  const toggleSort = prop => {
    const direction = sortOptions.direction === 'desc' ? 'asc' : 'desc';

    setSort({
      direction,
      prop
    });
  };

  // project name and version
  const { name, version } = dependenciesSet || {};
  const dependencies = dependenciesSet.data || [];
  const outdated = outdatedSet.data || [];

  // dispatch actions
  useEffect(
    () => {
      if (Array.isArray(dependencies) && dependencies.length) {
        if (page !== 0) {
          dispatch(setPage({ page: 0 }));
        }

        dispatch(
          setPackagesSuccess({ data: dependencies, name, version, outdated })
        );

        if (outdated && outdated.length) {
          dispatch(
            setPackagesOutdatedSuccess({
              data: outdated
            })
          );
        }

        clearUI(); //clear notifications, snackbar etc
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

      const withPeerMissing = filter(pkg => {
        return pkg.__peerMissing;
      }, dependencies);

      if (withPeerMissing.length) {
        dispatch(
          setSnackbar({
            open: true,
            type: 'warning',
            message: WARNING_MESSAGES.peerMissing
          })
        );
      }

      const withErrors = filter(pkg => {
        return pkg.__error;
      }, dependencies);

      if (withErrors.length) {
        dispatch(
          setSnackbar({
            open: true,
            type: 'error',
            message: WARNING_MESSAGES.errorPackages
          })
        );
      }
    },
    [dependenciesSet] // TODO: wip inputs--too late for now (01:22:55)
  );

  // sort packages
  useEffect(
    () => {
      const data = dependencies && dependencies.slice(0); // clone dependencies

      if (!data || !data.length) {
        return;
      }

      const { direction, prop } = sortOptions;

      const sortedData =
        direction === 'asc'
          ? data.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
          : data.sort((a, b) => (b[prop] < a[prop] ? -1 : 1));

      dispatch(
        setPackagesSuccess({ data: sortedData, fromSort: true, outdated })
      );
    },
    [dependenciesSet, sortOptions]
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
    return !pkg.__error && !pkg.__peerMissing;
  }, data);

  // actions listeners && yarn-lock warning
  useEffect(
    () => {
      ipcRenderer.once(['action-close'], (event, error, data) => {
        if (error) {
          dispatch(addActionError('actionName', error));
        }

        reload();
      });

      ipcRenderer.once('yarn-warning-close', event => {
        dispatch(
          setSnackbar({
            open: true,
            type: 'error',
            message: WARNING_MESSAGES.yarnlock
          })
        );
      });

      return () =>
        ipcRenderer.removeAllListeners(['action-close', 'yarn-warning-close']);
    },
    [counter]
  );

  // pagination
  const dataSlices =
    packagesData &&
    packagesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const nodata = !Boolean(dataSlices && dataSlices.length !== 0);

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
          />
        </div>
        <div className={cn(classes.tableWrapper, classes.tablelist)}>
          <Table
            aria-labelledby="packages-list"
            className={cn(classes.table, {
              [classes.hasFilterBlur]: loading
            })}
          >
            <TableHeader
              packages={dataSlices.map(d => d.name)}
              numSelected={Number(selected.length)}
              rowCount={(data && data.length) || 0}
              sortBy={sortOptions.prop}
              sortDir={sortOptions.direction}
              setSortBy={(e, prop) =>
                setSort(
                  merge(sortOptions, {
                    prop
                  })
                )
              }
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
              classes={{
                root: {
                  [classes.hidden]: nodata
                }
              }}
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
          autoHideDuration={5000}
          onClose={() => closeSnackbar()}
        >
          <SnackbarContent
            variant={snackbarOptions.type}
            message={snackbarOptions.message}
            onClose={() => closeSnackbar()}
          />
        </Snackbar>
      )}
    </AppLoader>
  );
};

Packages.propTypes = {
  classes: objectOf(string).isRequired
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
