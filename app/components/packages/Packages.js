/* eslint-disable */

/**
 * Packages component
 */

import { ipcRenderer } from 'electron';
import React, { useEffect, useState, useRef } from 'react';
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

import { WARNING_MESSAGES } from 'constants/AppConstants';

import { listStyles as styles } from '../styles/packagesStyles';
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
  setSnackbar,
  setPage,
  setPageRows,
  toggleLoader
} from 'models/ui/actions';

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

  const [sortDir, setSortDir] = useState('asc');
  const [sortBy, setSortBy] = useState('name');
  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();

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
      dispatch(clearPackages());
      dispatch(clearNotifications());

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

  // filter packages
  const filteredPackages =
    filters && filters.length ? getFiltered(packages, filters) : [];

  // assign final data
  const data =
    Array.isArray(filteredPackages) && filteredPackages.length
      ? filteredPackages
      : packages;

  // exclude packages with errors and peerMissing?
  const packagesData = filter(pkg => {
    return !pkg.__error;
  }, data);

  // actions listeners
  useEffect(
    () => {
      ipcRenderer.once(['action-close'], (event, error, data) => {
        if (error) {
          dispatch(addActionError('actionName', error));
        }

        reload();
      });

      return () => ipcRenderer.removeAllListeners(['action-close']);
    },
    [counter]
  );

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
          autoHideDuration={2000}
        >
          <SnackbarContent
            variant={snackbarOptions.type || 'info'}
            message={snackbarOptions.message}
            onClose={() =>
              dispatch(
                setSnackbar({
                  open: false,
                  message: null
                })
              )
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
