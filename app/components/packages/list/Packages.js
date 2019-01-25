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
import Snackbar from '@material-ui/core/Snackbar';

import useIpc from 'commons/hooks/useIpc';
import useFilters from 'commons/hooks/useFilters';
import { filterByProp } from 'commons/utils';
import SnackbarContent from 'components/layout/SnackbarContent';
import AppLoader from 'components/layout/AppLoader';

import {
  addActionError,
  addSelected,
  clearSelected,
  setPackagesSuccess,
  setOutdatedSuccess
} from 'models/packages/actions';

import {
  clearSnackbar,
  setPage,
  setPageRows,
  setSnackbar
} from 'models/ui/actions';

import {
  APP_INFO,
  INFO_MESSAGES,
  WARNING_MESSAGES
} from 'constants/AppConstants';

import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import PackageItem from './PackageItem';

import { listStyles as styles } from './styles/packagesStyles';

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

  const clearUI = () => {
    dispatch(clearSnackbar());
    dispatch(clearSelected());
  };

  const updateSnackbar = useCallback(
    ({ open, type, message }) =>
      dispatch(
        setSnackbar({
          open,
          type,
          message
        })
      ),
    []
  );

  const scrollWrapper = useCallback(
    top => {
      const wrapperEl = wrapperRef && wrapperRef.current;

      wrapperEl &&
        wrapperEl.scroll({
          top
        });
    },
    [top]
  );

  const reload = () => setCounter(counter + 1);

  // useIpc hook to send and listenTo ipc events
  const [dependenciesSet, outdatedSet] = useIpc(
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
      clearUI();

      if (page !== 0) {
        dispatch(setPage({ page: 0 }));
      }

      if (Array.isArray(dependencies) && !dependencies.length) {
        // dispatch(toggleLoader(false));
      } else {
        dispatch(
          setPackagesSuccess({
            dependencies,
            outdated,
            projectName,
            projectVersion
          })
        );
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
          dispatch(addActionError({ error }));
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
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: WARNING_MESSAGES.yarnlock
        })
      );
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
        scrollWrapper(0);
        dispatch(setPage({ page: pageNo }));
      }}
      handleChangePageRows={e =>
        dispatch(setPageRows({ rowsPerPage: e.target.value }))
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
            scrollWrapper={scrollWrapper}
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
                          addSelected={() => dispatch(addSelected({ name }))}
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
            dispatch(
              setSnackbar({
                open: false,
                message: null
              })
            )
          }
        >
          <SnackbarContent
            variant={snackbarOptions.type}
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

Packages.propTypes = {
  classes: objectOf(string).isRequired
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
