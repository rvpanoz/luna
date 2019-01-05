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
  doAddActionError,
  doAddSelected,
  doClearPackages,
  doSetPackagesSuccess,
  doSetOutdatedSuccess
} from 'models/packages/selectors';

import {
  doAddNotification,
  doClearNotifications,
  doClearSnackbar,
  doToggleLoader,
  doTogglePackageLoader,
  doSetPage,
  doSetPageRows,
  doSetSnackbar
} from 'models/ui/selectors';

import { INFO_MESSAGES, WARNING_MESSAGES } from 'constants/AppConstants';
import { listStyles as styles } from '../styles/packagesStyles';
import { APP_INFO } from '../../constants/AppConstants';
import { setActive } from '../../models/packages/actions';
import { doSetActive } from '../../models/packages/selectors';

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
  active: state.packages.active,
  action: state.packages.action,
  filters: state.packages.filters,
  packages: state.packages.packages,
  packagesOutdated: state.packages.packagesOutdated,
  selected: state.packages.selected,
  fromSearch: state.packages.fromSearch
});

const isSelected = (name, selected) => selected.indexOf(name) !== -1;

const Packages = props => {
  const { classes } = props;
  const {
    action: { actionName, actionError },
    loader: { loading, message },
    active,
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
    opts.packages === true && doClearPackages(dispatch);
    opts.notifications === true && doClearNotifications(dispatch);
    opts.snackbar === true && doClearSnackbar(dispatch);
    active && opts.active === true && doSetActive(dispatch, { active: null });
  }, []);

  const setSelected = useCallback(
    name => doAddSelected(dispatch, { name }),
    []
  );

  const updateLoader = useCallback(
    (loading, message) => doToggleLoader(dispatch, { loading, message }),
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
          packages: true,
          notifications: true,
          snackbar: true,
          active: true
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

      const withPeerMissing =
        dependencies &&
        filter(pkg => {
          return pkg.__peerMissing;
        }, dependencies);

      if (withPeerMissing && withPeerMissing.length) {
        doSetSnackbar(dispatch, {
          open: true,
          type: 'warning',
          message: WARNING_MESSAGES.peerMissing
        });
      }

      const withErrors =
        dependencies &&
        filter(pkg => {
          return pkg.__error;
        }, dependencies);

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

  /**
   * TODO: description
   */
  useEffect(() => {
    ipcRenderer.on(['action-close'], (event, error, data) => {
      if (error) {
        doAddActionError(dispatch, { error });
      }

      setCounter(counter + 1);
    });

    ipcRenderer.on(['view-package-close'], (event, status, error, data) => {
      doTogglePackageLoader(dispatch, {
        loading: false,
        message: null
      });

      doSetSnackbar(dispatch, {
        open: true,
        type: 'info',
        message: INFO_MESSAGES.packageLoaded
      });

      try {
        const active = data && JSON.parse(data);

        doSetActive(dispatch, {
          active
        });
      } catch (err) {
        doSetSnackbar(dispatch, {
          open: true,
          type: 'danger',
          message: err.message
        });
      }
    });

    ipcRenderer.on('yarn-warning-close', event => {
      doSetSnackbar(dispatch, {
        open: true,
        type: 'error',
        message: WARNING_MESSAGES.yarnlock
      });
    });

    return () =>
      ipcRenderer.removeAllListeners(['action-close', 'yarn-warning-close']);
  }, []);

  const filteredPackages =
    filters && filters.length ? getFiltered(packages, filters) : [];

  const data =
    Array.isArray(filteredPackages) && filteredPackages.length
      ? filteredPackages
      : packages;

  // exclude packages with errors and peerMissing
  const packagesData = filter(pkg => {
    return !pkg.__error && !pkg.__peerMissing;
  }, data);

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
                onClearSelected={() => clearSelected(dispatch)}
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
