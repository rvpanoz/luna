/* eslint-disable */

/**
 * Packages component
 */

import { ipcRenderer } from 'electron';
import React, { useEffect, useState, useCallback } from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { filter } from 'ramda';
import { withStyles, Typography } from '@material-ui/core';
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

import { INFO_MESSAGES, WARNING_MESSAGES } from 'constants/AppConstants';
import { listStyles as styles } from '../styles/packagesStyles';
import { APP_INFO } from '../../constants/AppConstants';

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

const isSelected = (name, selected) => selected.indexOf(name) !== -1;

const Packages = props => {
  console.log(1);
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

  // ui handlers
  const clearUI = useCallback(opts => {
    if (!opts) {
      return;
    }

    opts.packages === true && dispatch(clearPackages());
    opts.notifications === true && dispatch(clearNotifications());
    opts.snackbar === true && dispatch(clearSnackbar());
  }, []);

  const reload = useCallback(
    () => {
      dispatch(toggleLoader({ loading: true, message: 'Loading packages..' }));
      setCounter(counter + 1);
    },
    [counter]
  );

  const setSelected = useCallback(name => dispatch(addSelected({ name }), []));
  const closeSnackbar = useCallback(() => {
    dispatch(
      setSnackbar({
        open: false,
        message: null
      })
    );
  }, []);
  const toggleSort = useCallback(
    prop => {
      const direction = sortOptions.direction === 'desc' ? 'asc' : 'desc';

      setSort({
        direction,
        prop
      });
    },
    [sortOptions]
  );

  // useIpc hook to send and listenTo ipc events
  const [dependenciesSet, outdatedSet, errors] = useIpc(
    'ipc-event',
    {
      ipcEvent: 'get-packages',
      cmd: ['outdated', 'list'],
      mode,
      directory
    },
    [mode, directory, counter]
  );

  const { name, version } = dependenciesSet || {};
  const dependencies = dependenciesSet.data;
  const outdated = outdatedSet.data;
  const nodata = dependencies && dependencies.length === 0;

  // dispatch actions
  useEffect(
    () => {
      clearUI({
        packages: true,
        notifications: true,
        snackbar: false
      });

      page !== 0 && dispatch(setPage({ page: 0 }));

      if (dependencies && Array.isArray(dependencies) && dependencies.length) {
        dispatch(
          setPackagesSuccess({ data: dependencies, name, version, outdated })
        );
      }

      if (outdated && Array.isArray(outdated) && outdated.length) {
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

      const withPeerMissing =
        dependencies &&
        filter(pkg => {
          return pkg.__peerMissing;
        }, dependencies);

      if (withPeerMissing && withPeerMissing.length) {
        dispatch(
          setSnackbar({
            open: true,
            type: 'warning',
            message: WARNING_MESSAGES.peerMissing
          })
        );
      }

      const withErrors =
        dependencies &&
        filter(pkg => {
          return pkg.__error;
        }, dependencies);

      if (withErrors && withErrors.length) {
        dispatch(
          setSnackbar({
            open: true,
            type: 'error',
            message: WARNING_MESSAGES.errorPackages
          })
        );
      }

      // handle empty data
      if (dependencies === null) {
        dispatch(toggleLoader({ loading: false, message: null }));
        dispatch(
          setSnackbar({
            open: true,
            type: 'info',
            message: INFO_MESSAGES.noData
          })
        );
      }
    },
    [counter, dependencies]
  );

  // sort packages
  useEffect(
    () => {
      const data = dependencies && dependencies.slice(0);

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
    [sortOptions]
  );

  // componentDidMount
  useEffect(() => {
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
  }, []);

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
            nodata={dependencies === null}
          />
        </div>
        <div className={classes.tableWrapper}>
          {nodata === false ? (
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
                        isSelected={isSelected(pkg.name, selected)}
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
          ) : (
            <div className={classes.nodata}>
              <Typography variant="caption" gutterBottom>
                {APP_INFO.NO_DATA}
              </Typography>
            </div>
          )}
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
