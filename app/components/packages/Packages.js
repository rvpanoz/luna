/**
 * Packages component
 */

/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */

import { ipcRenderer } from 'electron';
import React, { useEffect, useState, useCallback } from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { filter, merge } from 'ramda';
import { withStyles, Typography } from '@material-ui/core';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import useIpc from 'commons/hooks/useIpc';
import { getFiltered, parseNpmError, filterByProp } from 'commons/utils';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from 'components/layout/SnackbarContent';

import {
  doAddActionError,
  doAddSelected,
  doClearPackages,
  doClearSelected,
  doSetPackagesSuccess,
  doSetOutdatedSuccess,
  doSetActive
} from 'models/packages/selectors';

import {
  doAddNotification,
  doClearNotifications,
  doClearSnackbar,
  doToggleLoader,
  doSetPage,
  doSetPageRows,
  doSetSnackbar
} from 'models/ui/selectors';

import {
  APP_INFO,
  INFO_MESSAGES,
  WARNING_MESSAGES
} from 'constants/AppConstants';

import AppLoader from '../layout/AppLoader';
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import PackageItem from './PackageItem';

import { listStyles as styles } from '../styles/packagesStyles';

// use useCallback if you need it inside component body
// const mapState = useCallback(state=>({
//   directory: state.common.directory
// }), [input])

const mapState = ({
  common: {
    directory,
    notifications,
    manager,
    mode,
    page,
    rowsPerPage,
    loader
  },
  packages: {
    snackbarOptions,
    active,
    action,
    filters,
    packages,
    packagesOutdated,
    selected,
    fromSearch
  }
}) => ({
  directory,
  notifications,
  manager,
  mode,
  page,
  rowsPerPage,
  loader,
  snackbarOptions,
  active,
  action,
  filters,
  packages,
  packagesOutdated,
  selected,
  fromSearch
});

const isSelected = (name, selected) => selected.indexOf(name) !== -1;

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
    fromSearch,
    snackbarOptions
  } = useMappedState(mapState);

  const [sortOptions, setSort] = useState({
    direction: 'asc',
    prop: 'name'
  });

  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();

  const clearUI = useCallback((...options) => {
    const { inert } = options;

    if (inert) {
      doSetActive(dispatch, { active: null });
    }

    doClearPackages(dispatch);
    doClearNotifications(dispatch);
    doClearSnackbar(dispatch);
  }, []);

  const setSelected = useCallback(
    name => doAddSelected(dispatch, { name }),
    []
  );

  const updateLoader = useCallback(
    (bool, content) =>
      doToggleLoader(dispatch, { loading: bool, message: content }),
    []
  );

  const closeSnackbar = useCallback(() => {
    doSetSnackbar(dispatch, {
      open: false,
      message: null
    });
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
    [counter, mode, directory]
  );

  const { projectName, projectVersion } = dependenciesSet || {};
  const dependencies = dependenciesSet.data;
  const outdated = outdatedSet.data;
  const nodata = dependencies && dependencies.length === 0;
  console.log('packages-render', dependencies && dependencies.length, counter);

  /**
   * TODO: description
   */
  useEffect(
    () => {
      if (page !== 0) {
        doSetPage(dispatch, { page: 0 });
      }

      if (dependencies && Array.isArray(dependencies) && dependencies.length) {
        clearUI({
          data: true,
          notifications: true,
          snackbar: true,
          inert: true
        });

        doSetPackagesSuccess(dispatch, {
          dependencies,
          projectName,
          projectVersion,
          outdated
        });
      }

      if (outdated && Array.isArray(outdated) && outdated.length) {
        doSetOutdatedSuccess(dispatch, {
          dependencies: outdated
        });

        updateLoader(false, null);
      }

      if (errors && typeof errors === 'string') {
        const errorsArr = errors.split('\n');
        let errorsLen = errorsArr && errorsArr.length;

        while (errorsLen--) {
          if (errorsArr[errorsLen]) {
            const [body, requires, requiredBy] = parseNpmError(
              errorsArr[errorsLen]
            );

            doAddNotification(dispatch, {
              level: 0,
              body,
              requires,
              requiredBy
            });
          }
        }
      }

      const withPeerMissing = filterByProp(dependencies, '__peerMissing');
      const withErrors = filterByProp(dependencies, '__error');

      if (withPeerMissing && withPeerMissing.length) {
        doSetSnackbar(dispatch, {
          open: true,
          type: 'warning',
          message: WARNING_MESSAGES.peerMissing
        });
      }

      if (withErrors && withErrors.length) {
        doSetSnackbar(dispatch, {
          open: true,
          type: 'error',
          message: WARNING_MESSAGES.errorPackages
        });
      }

      // handle empty data
      if (dependencies === null) {
        doSetSnackbar(dispatch, {
          open: true,
          type: 'info',
          message: INFO_MESSAGES.noData
        });
      }
    },
    [dependenciesSet]
  );

  /**
   * TODO: description
   */
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

      doSetPackagesSuccess(dispatch, {
        dependencies: sortedData,
        fromSort: true,
        outdated
      });
    },
    [sortOptions]
  );

  useEffect(
    () => {
      ipcRenderer.on(['action-close'], (event, error) => {
        if (error && error.length) {
          doAddActionError(dispatch, { error });
        }

        setCounter(counter + 1);
      });

      return () => ipcRenderer.removeAllListeners(['action-close']);
    },
    [counter]
  );

  /**
   * TODO: description
   */
  useEffect(() => {
    ipcRenderer.on(['view-package-close'], (event, status, error, data) => {
      try {
        // WIP
        const active = data && JSON.parse(data);
        console.log(active);
        // doSetActive(dispatch, {
        //   active
        // });

        doSetSnackbar(dispatch, {
          open: true,
          type: 'info',
          message: INFO_MESSAGES.packageLoaded
        });
      } catch (err) {
        console.error(err);
        doSetSnackbar(dispatch, {
          open: true,
          type: 'danger',
          message: err.message
        });
      }
    });

    ipcRenderer.on('yarn-warning-close', () => {
      doSetSnackbar(dispatch, {
        open: true,
        type: 'error',
        message: WARNING_MESSAGES.yarnlock
      });
    });

    return () =>
      ipcRenderer.removeAllListeners([
        'action-close',
        'view-package-close',
        'yarn-warning-close'
      ]);
  }, []);

  const filteredPackages =
    filters && filters.length ? getFiltered(packages, filters) : [];

  const data =
    Array.isArray(filteredPackages) && filteredPackages.length
      ? filteredPackages
      : packages;

  const packagesData = filter(pkg => !pkg.__error && !pkg.__peerMissing, data);

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
            reload={() => setCounter(counter + 1)}
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
                  doAddSelected(dispatch, {
                    name,
                    force
                  })
                }
                onClearSelected={() => doClearSelected(dispatch)}
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
                        manager={manager}
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
                  doSetPage(dispatch, { page: pageNo })
                }
                handleChangePageRows={e =>
                  doSetPageRows(dispatch, { rowsPerPage: e.target.value || 10 })
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
