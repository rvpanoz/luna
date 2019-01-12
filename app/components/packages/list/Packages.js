/**
 * Packages component
 */

/* eslint-disable */

import { ipcRenderer } from 'electron';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import useIpc from 'commons/hooks/useIpc';
import useFilters from 'commons/hooks/useFilters';
import { parseNpmError, filterByProp } from 'commons/utils';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from 'components/layout/SnackbarContent';

import {
  onAddActionError,
  onAddSelected,
  onSetPackagesSuccess,
  onSetOutdatedSuccess,
  onSetActive
} from 'models/packages/selectors';

import {
  onAddNotification,
  onToggleLoader,
  onSetPage,
  onSetPageRows,
  onSetSnackbar
} from 'models/ui/selectors';

import {
  APP_INFO,
  INFO_MESSAGES,
  WARNING_MESSAGES
} from 'constants/AppConstants';

import AppLoader from 'components/layout/AppLoader';
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import PackageItem from './PackageItem';

import { listStyles as styles } from '../../styles/packagesStyles';
import { onClearNotifications, onClearSnackbar } from 'models/ui/selectors';
import { onClearSelected } from 'models/packages/selectors';

const mapState = ({
  common: {
    directory,
    notifications,
    manager,
    mode,
    page,
    rowsPerPage,
    loader,
    snackbarOptions
  },
  packages: {
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

  const wrapperRef = useRef(null);
  const [counter, setCounter] = useState(0); // force render programmaticlly
  const dispatch = useDispatch();

  const isSelected = useCallback(
    (name, selected) => selected.indexOf(name) !== -1,
    [name, selected]
  );

  const clearUI = options => {
    const { inert } = options;

    if (inert) {
      onSetActive(dispatch, { active: null });
    }

    onClearNotifications(dispatch);
    onClearSnackbar(dispatch);
    onClearSelected(dispatch);
  };

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
  const nodata = Boolean(dependencies && dependencies.length === 0);

  useEffect(
    () => {
      clearUI({
        data: true,
        notifications: true,
        snackbar: true,
        inert: true
      });

      if (page !== 0) {
        onSetPage(dispatch, { page: 0 });
      }

      if (dependencies && Array.isArray(dependencies) && dependencies.length) {
        onSetPackagesSuccess(dispatch, {
          dependencies,
          projectName,
          projectVersion,
          outdated
        });

        if (outdated && Array.isArray(outdated) && outdated.length) {
          onSetOutdatedSuccess(dispatch, {
            dependencies: outdated
          });
        }

        onToggleLoader(dispatch, { loading: false, message: null });
      }

      if (errors && typeof errors === 'string') {
        const errorsArr = errors.split('\n');
        let errorsLen = errorsArr && errorsArr.length;

        while (errorsLen--) {
          if (errorsArr[errorsLen]) {
            const [body, requires, requiredBy] = parseNpmError(
              errorsArr[errorsLen]
            );

            onAddNotification(dispatch, {
              level: 0,
              body,
              requires,
              requiredBy
            });
          }
        }
      }

      const withErrors = dependencies && filterByProp(dependencies, '__error');

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
    },
    [dependenciesSet]
  );

  useEffect(
    () => {
      ipcRenderer.on(['action-close'], (event, error) => {
        if (error && error.length) {
          onAddActionError(dispatch, { error });
        }

        // force render
        setCounter(counter + 1);
      });

      return () => ipcRenderer.removeAllListeners(['action-close']);
    },
    [counter]
  );

  // more listeners
  useEffect(() => {
    ipcRenderer.on('yarn-warning-close', () => {
      onSetSnackbar(dispatch, {
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
  const [data] = useFilters(packages, filters, counter);

  /**
   * Render footer based on data in order to
   * calculate the rows count when filters are on
   */
  const renderFooter = useCallback(() => (
    <TableFooter
      classes={{
        root: {
          [classes.hidden]: nodata
        }
      }}
      rowCount={data && data.length}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={(e, pageNo) => {
        const wrapperEl = wrapperRef && wrapperRef.current;

        // scroll to top
        wrapperEl &&
          wrapperEl.scroll({
            top: 0
          });

        onSetPage(dispatch, { page: pageNo });
      }}
      handleChangePageRows={e =>
        onSetPageRows(dispatch, { rowsPerPage: e.target.value })
      }
    />
  ));

  // pagination
  const dataSlices =
    data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // sorting
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
        <div className={classes.tableWrapper} ref={wrapperRef}>
          {nodata === false ? (
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
                          addSelected={() => onAddSelected(dispatch, { name })}
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
              {renderFooter()}
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

      {snackbarOptions && snackbarOptions.open && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={Boolean(snackbarOptions.open)}
          autoHideDuration={5000}
          onClose={() =>
            onSetSnackbar(dispatch, {
              open: false,
              message: null
            })
          }
        >
          <SnackbarContent
            variant={snackbarOptions.type}
            message={snackbarOptions.message}
            onClose={() =>
              onSetSnackbar(dispatch, {
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

Packages.propTypes = {
  classes: objectOf(string).isRequired
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
