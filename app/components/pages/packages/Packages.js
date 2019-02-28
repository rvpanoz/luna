/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */

import { ipcRenderer } from 'electron';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
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
  setPageRows
} from 'models/packages/actions';
import { setSnackbar } from 'models/ui/actions';
import { APP_MODES, WARNING_MESSAGES } from 'constants/AppConstants';

import { PackageDetails } from 'components/pages/package';
import AppCard from 'components/common/AppCard';

import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import PackageItem from './PackageItem';

import styles from './styles/packages';

const mapState = ({
  common: { directory, manager, mode, loader, notifications },
  repository: {
    active,
    data: { packages, packagesOutdated },
    operations: { action, selected, packagesInstallOptions },
    pagination: { page, rowsPerPage },
    filtering: { filters },
    metadata: { fromSearch, lastUpdatedAt },
    sorting: { sortBy, sortDir }
  }
}) => ({
  active,
  lastUpdatedAt,
  directory,
  manager,
  notifications,
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
    notifications,
    lastUpdatedAt
  } = useMappedState(mapState);

  const wrapperRef = useRef(null);
  const [counter, setCounter] = useState(0);

  const reload = () => setCounter(counter + 1);
  const dispatch = useDispatch();

  const isSelected = useCallback(
    (name, selectedPackages) => selectedPackages.indexOf(name) !== -1,
    [name, selected]
  );

  const packagesOutdatedNames =
    packagesOutdated && packagesOutdated.map(outdated => outdated.name);

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

  const {
    projectName,
    projectVersion,
    projectDescription,
    projectLicense,
    projectAuthor
  } = dependenciesSet || {};

  const dependencies = dependenciesSet.data;
  const outdated = outdatedSet.data;
  const nodata = Boolean(dependencies && dependencies.length === 0);

  useEffect(() => {
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
    ipcRenderer.on('yarn-warning-close', () => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: WARNING_MESSAGES.yarnlock
        })
      );
    });

    ipcRenderer.on(['action-close'], (event, error) => {
      if (error && error.length) {
        dispatch(addActionError({ error }));
      }

      reload();
    });

    return () =>
      ipcRenderer.removeAllListeners(['action-close', 'yarn-warning-close']);
  }, []);

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
    <React.Fragment>
      <section className={cn(classes.cards)}>
        <Grid container justify="space-between">
          <Grid item md={3} lg={4} xl={4}>
            <AppCard
              avatar
              title="Packages"
              description="Total"
              subtitle={mode}
              iconHeader="packages"
              total={packagesData ? packagesData.length : '0'}
              small={mode === APP_MODES.local ? projectName : null}
              iconColor="primary"
              footerText={lastUpdatedAt}
            />
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <AppCard
              avatar
              iconHeader="outdated"
              title="Outdated"
              iconColor="warning"
              footerText={lastUpdatedAt}
              total={packagesOutdated ? packagesOutdated.length : '0'}
              description="Found"
            />
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <AppCard
              avatar
              iconHeader="error"
              title="Problems"
              total={notifications ? notifications.length : '0'}
              iconColor="secondary"
              description="Found"
              footerText={lastUpdatedAt}
            />
          </Grid>
        </Grid>
      </section>
      <AppLoader loading={loading} message={message}>
        <Grid container>
          <Grid item sm={8} md={6} lg={6} xl={6}>
            <Paper className={classes.root}>
              <div className={classes.toolbar}>
                <TableToolbar
                  title="Packages"
                  manager={manager}
                  mode={mode}
                  directory={directory}
                  selected={selected}
                  packagesOutdatedNames={packagesOutdatedNames}
                  packagesInstallOptions={packagesInstallOptions}
                  fromSearch={fromSearch}
                  reload={reload}
                  nodata={nodata}
                  scrollWrapper={scrollWrapper}
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
                    rowCount={dependencies && dependencies.length}
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
                        [classes.hidden]: nodata
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
          </Grid>
          <Grid item sm={4} md={4} lg={4} xl={4}>
            <PackageDetails />
          </Grid>
        </Grid>
      </AppLoader>
    </React.Fragment>
  );
};

Packages.propTypes = {
  classes: objectOf(string).isRequired
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
