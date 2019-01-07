/**
 * Packages component
 */

/* eslint-disable */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */

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
    fromSearch,
    sortDir,
    sortBy
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
  fromSearch,
  sortDir,
  sortBy
});

const isSelected = (name, selected) => selected.indexOf(name) !== -1;

const Packages = ({ classes }) => {
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
    snackbarOptions,
    sortDir,
    sortBy
  } = useMappedState(mapState);

  const [counter, setCounter] = useState(0); // force render programmaticlly
  const dispatch = useDispatch();

  const clearUI = useCallback(options => {
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

  const updateSnackbar = useCallback(
    ({ open, type, message }) =>
      doSetSnackbar(dispatch, {
        open,
        type,
        message
      }),
    []
  );

  const reload = () => setCounter(counter + 1);

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

  useEffect(
    () => {
      clearUI({
        data: true,
        notifications: true,
        snackbar: true,
        inert: true
      });

      if (page !== 0) {
        doSetPage(dispatch, { page: 0 });
      }

      if (dependencies && Array.isArray(dependencies) && dependencies.length) {
        doSetPackagesSuccess(dispatch, {
          dependencies,
          projectName,
          projectVersion,
          outdated
        });

        if (outdated && Array.isArray(outdated) && outdated.length) {
          doSetOutdatedSuccess(dispatch, {
            dependencies: outdated
          });
        }
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

      const withErrors = filterByProp(dependencies, '__error');

      if (withErrors && withErrors.length) {
        updateSnackbar({
          open: true,
          type: 'error',
          message: WARNING_MESSAGES.errorPackages
        });
      }

      // handle empty data
      if (dependencies === null) {
        updateSnackbar({
          open: true,
          type: 'info',
          message: INFO_MESSAGES.nodata
        });
      }

      updateLoader(false, null);
    },
    [dependenciesSet]
  );

  useEffect(
    () => {
      // handles install and uninstall actions
      ipcRenderer.on(['action-close'], (event, error) => {
        if (error && error.length) {
          doAddActionError(dispatch, { error });
        }

        setCounter(counter + 1); // force render
      });

      return () => ipcRenderer.removeAllListeners(['action-close']);
    },
    [counter]
  );

  useEffect(() => {
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

  // filtering
  const filteredPackages =
    filters && filters.length ? getFiltered(packages, filters) : packages;

  const dataSlices =
    filteredPackages &&
    filteredPackages.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

  const sortedPackages =
    sortDir === 'asc'
      ? dataSlices.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1))
      : dataSlices.sort((a, b) => (b[sortBy] < a[sortBy] ? -1 : 1));

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
                rowCount={dependencies && dependencies.length}
              />
              <TableBody>
                {sortedPackages &&
                  sortedPackages.map(
                    ({
                      name,
                      version,
                      latest,
                      isOutdated,
                      __group,
                      __error,
                      __peerMissing
                    }) =>
                      !__error && !__peerMissing ? (
                        <PackageItem
                          key={`pkg-${name}`}
                          isSelected={isSelected(name, selected)}
                          setSelected={setSelected}
                          name={name}
                          manager={manager}
                          version={version}
                          latest={latest}
                          isOutdated={isOutdated}
                          group={__group}
                        />
                      ) : null
                  )}
              </TableBody>
              <TableFooter
                classes={{
                  root: {
                    [classes.hidden]: nodata
                  }
                }}
                rowCount={dependencies && dependencies.length}
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
