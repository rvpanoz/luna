/* eslint-disable */

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
  updateData
} from 'models/packages/actions';
import { setPage, setPageRows, setSnackbar } from 'models/ui/actions';
import { APP_MODES, WARNING_MESSAGES } from 'constants/AppConstants';

import AppCard from 'components/common/AppCard';
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
    notifications,
    page,
    rowsPerPage,
    loader,
    npm: { env }
  },
  packages: {
    active,
    action,
    filters,
    packages,
    packagesOutdated,
    selected,
    packagesInstallOptions,
    fromSearch,
    sortDir,
    sortBy,
    lastUpdatedAt
  }
}) => ({
  env,
  lastUpdatedAt,
  directory,
  manager,
  mode,
  notifications,
  page,
  rowsPerPage,
  loader,
  active,
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
    notifications,
    page,
    filters,
    rowsPerPage,
    directory,
    manager,
    selected,
    fromSearch,
    sortDir,
    sortBy,
    env,
    packagesInstallOptions,
    lastUpdatedAt
  } = useMappedState(mapState);

  const wrapperRef = useRef(null);
  const [counter, setCounter] = useState(0);

  const reload = () => setCounter(counter + 1);
  const dispatch = useDispatch();

  const isSelected = useCallback(
    (name, selected) => selected.indexOf(name) !== -1,
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
    ipcRenderer.on(['action-close'], (event, error) => {
      if (error && error.length) {
        dispatch(addActionError({ error }));
      }

      reload();
    });

    return () => ipcRenderer.removeAllListeners(['action-close']);
  }, [counter]);

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

  const [data] = useFilters(packages, filters, counter);

  // pagination
  const dataSlices =
    data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
              title={mode === APP_MODES.global ? 'in Global' : projectLicense}
              small={mode === APP_MODES.local ? `v${projectVersion}` : null}
              description={mode === APP_MODES.local ? projectName : null}
              iconColor="primary"
              statText={lastUpdatedAt}
              loading={loading}
            />
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <AppCard
              avatar
              iconHeader="dependencies"
              title="Dependencies"
              description={data && data.length}
              iconColor="secondary"
              statText={lastUpdatedAt}
            />
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <AppCard
              avatar
              iconHeader="outdated"
              title="Outdated"
              iconColor="warning"
              statText={lastUpdatedAt}
              description={packagesOutdated && packagesOutdated.length}
            />
          </Grid>
        </Grid>
      </section>
      <AppLoader loading={loading} message={message}>
        <Paper className={classes.root}>
          <div className={classes.toolbar}>
            <TableToolbar
              title="Packages"
              manager={manager}
              mode={mode}
              directory={directory}
              selected={selected}
              packagesOutdatedNames={packagesOutdatedNames}
              fromSearch={fromSearch}
              reload={reload}
              nodata={dependencies === null}
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
                          isSelected={isSelected(name, selected)}
                          installOptions={installOptions}
                          addSelected={() => dispatch(addSelected({ name }))}
                          addInstallOption={(name, options) =>
                            dispatch(addInstallOption({ name, options }))
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
            </Table>
          </div>
        </Paper>
      </AppLoader>
    </React.Fragment>
  );
};

Packages.propTypes = {
  classes: objectOf(string).isRequired
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
