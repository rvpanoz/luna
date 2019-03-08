/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */

import { ipcRenderer } from 'electron';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';

import useIpc from 'commons/hooks/useIpc';
import useFilters from 'commons/hooks/useFilters';
import AppLoader from 'components/common/AppLoader';

import {
  addActionError,
  addSelected,
  addInstallOption,
  updateData,
  setPage,
  setPageRows,
  setPackagesStart
} from 'models/packages/actions';
import { clearAll } from 'models/ui/actions';

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
    npm: { paused }
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
  sortBy
});

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
    paused
  } = useMappedState(mapState);

  const [counter, setCounter] = useState(0);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  const [dependenciesSet, outdatedSet] = useIpc(
    'ipc-event',
    {
      ipcEvent: 'get-packages',
      cmd: ['outdated', 'list'],
      mode,
      directory,
      paused
    },
    [counter, paused, mode, directory]
  );

  const {
    projectName,
    projectVersion,
    projectDescription,
    projectLicense,
    projectAuthor
  } = dependenciesSet || {};

  const dependencies = dependenciesSet.data;
  const outdated = outdatedSet.data;

  useEffect(() => {
    if (paused) {
      return;
    }

    if (!dependencies) {
      dispatch(clearAll());
      return;
    }

    dispatch(
      updateData({
        dependencies,
        outdated,
        projectName,
        projectVersion,
        projectDescription,
        projectLicense,
        projectAuthor
      })
    );
  }, [dependenciesSet]);

  useEffect(() => {
    ipcRenderer.on('action-close', (event, error) => {
      if (error && error.length) {
        dispatch(addActionError({ error }));
      }

      dispatch(
        setPackagesStart({
          channel: 'ipc-event',
          options: {
            ipcEvent: 'get-packages',
            cmd: ['outdated', 'list'],
            mode,
            directory
          },
          paused
        })
      );
    });

    return () =>
      ipcRenderer.removeAllListeners(['action-close', 'yarn-warning-close']);
  }, []);

  const isSelected = useCallback(
    (name, selectedPackages) => selectedPackages.indexOf(name) !== -1,
    [name, selected]
  );

  const scrollWrapper = useCallback(
    top => {
      const wrapperEl = wrapperRef && wrapperRef.current;

      wrapperEl &&
        wrapperEl.scroll({
          top,
          behavior: 'smooth'
        });
    },
    [top]
  );

  // setup packages
  const [packagesData] = useFilters(packages, filters, counter);

  // pagination
  const dataSlices =
    packagesData &&
    packagesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // sorting
  const sortedPackages =
    sortDir === 'asc'
      ? dataSlices.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1))
      : dataSlices.sort((a, b) => (b[sortBy] < a[sortBy] ? -1 : 1));

  return (
    <AppLoader loading={loading} message={message}>
      <Grid container>
        <Grid item md={12} lg={6} xl={6}>
          {packagesData.length === 0 ? (
            <Typography variant="subtitle1">
              There are not any packages in this project.
            </Typography>
          ) : (
            <Paper className={classes.root}>
              <div className={classes.toolbar}>
                <TableToolbar
                  title="Packages"
                  manager={manager}
                  mode={mode}
                  directory={directory}
                  selected={selected}
                  outdated={packagesOutdated}
                  packagesInstallOptions={packagesInstallOptions}
                  fromSearch={fromSearch}
                  scrollWrapper={scrollWrapper}
                  reload={() => setCounter(counter + 1)}
                />
              </div>
              <div className={classes.tableWrapper} ref={wrapperRef}>
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
                    {sortedPackages &&
                      sortedPackages.map(
                        ({
                          name,
                          version,
                          latest,
                          isOutdated,
                          peerDependencies,
                          __group,
                          __error,
                          __peerMissing
                        }) => {
                          const isPackageSelected = isSelected(name, selected);
                          const installOptions = Array.isArray(
                            packagesInstallOptions
                          )
                            ? packagesInstallOptions.find(
                                data => data.name === name
                              )
                            : {};

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
                              manager={manager}
                              version={version}
                              latest={latest}
                              isOutdated={isOutdated}
                              fromSearch={fromSearch}
                              group={__group}
                              error={__error}
                              peerMissing={__peerMissing}
                            />
                          );
                        }
                      )}
                  </TableBody>
                  <TableFooter
                    classes={{
                      root: {
                        [classes.hidden]: false // nodata
                      }
                    }}
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
              </div>
            </Paper>
          )}
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
