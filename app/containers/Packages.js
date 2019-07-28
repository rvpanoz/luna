import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { objectOf, string } from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { useFilters } from 'commons/hooks';
import { AppLoader, HelperText } from 'components/common';

import { scrollWrapper, iMessage } from 'commons/utils';

import {
  setPackagesStart,
  viewPackageStart,
  installPackage,
  installMultiplePackages
} from 'models/packages/actions';
import {
  addSelected,
  setPage,
  setPageRows,
  setActivePage
} from 'models/ui/actions';
import { setMode, clearInstallOptions } from 'models/common/actions';

import {
  ToolbarView,
  HeaderView,
  PaginationView,
  PackageItemView,
  DialogOptionsView
} from 'components/views/packages';

import PackageDetails from './PackageDetails';
import styles from './styles/packages';

const mapState = ({
  common: {
    directory,
    manager,
    mode,
    operations: { packagesInstallOptions, action }
  },
  packages: {
    active,
    packagesData,
    packagesOutdated,
    metadata: { fromSearch }
  },
  npm: { operationStatus, operationPackages, operationCommand, auditData },
  ui: {
    paused,
    loaders: { loader, packageLoader },
    pagination: { page, rowsPerPage },
    filtering: { filters },
    sorting: { sortBy, sortDir },
    selected
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
  packageLoader,
  action,
  filters,
  packagesData,
  packagesOutdated,
  selected,
  packagesInstallOptions,
  fromSearch,
  sortDir,
  sortBy,
  operationStatus,
  operationPackages,
  operationCommand,
  auditData
});

const Packages = ({ classes }) => {
  const {
    loader: { loading, message },
    packagesData,
    packagesOutdated,
    mode,
    page,
    filters,
    rowsPerPage,
    directory,
    selected,
    fromSearch,
    sortDir,
    sortBy,
    packagesInstallOptions,
    active,
    operationStatus,
    operationPackages,
    operationCommand,
    auditData,
  } = useMappedState(mapState);

  /* eslint-disable-next-line */
  const [packagesFromPackageJson, setPackageJsonPackages] = useState([]);
  const [auditPackages, setAuditPackages] = useState([]);
  const [options, toggleOptions] = useState({
    open: false,
    single: false,
    name: null,
    version: null
  });
  const [filteredByNamePackages, setFilteredByNamePackages] = useState([]);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  const reload = () => {
    dispatch(setActivePage({ page: 'packages', paused: false }));
    dispatch(
      setPackagesStart({
        channel: 'npm-list-outdated',
        options: {
          cmd: ['outdated', 'list']
        }
      })
    );
  };

  const switchMode = (appMode, appDirectory) => {
    dispatch(setMode({ mode: appMode, directory: appDirectory }));
    dispatch(setActivePage({ page: 'packages', paused: false }));

    if (fromSearch) {
      dispatch(
        setPackagesStart({
          channel: 'npm-list-outdated',
          options: {
            cmd: ['outdated', 'list']
          }
        })
      );
    }
  };

  const viewPackageHandler = (name, version) =>
    dispatch(
      viewPackageStart({
        channel: 'npm-view',
        options: {
          cmd: ['view'],
          name,
          version: name === 'npm' ? null : version
        }
      })
    );

  useEffect(() => {
    dispatch(
      setPackagesStart({
        channel: 'npm-list-outdated',
        options: {
          cmd: ['outdated', 'list'],
          mode,
          directory
        }
      })
    );
  }, [mode, directory, dispatch]);

  useEffect(() => {
    const { error, content } = auditData || {};

    if (error || !content) return;

    const { actions } = content;

    // use only depth=1 modules
    const packagesDepthOne =
      actions &&
      actions
        .filter(({ depth, action }) => !depth || action === 'install')
        .map(({ module }) => module);

    setAuditPackages(packagesDepthOne);
  }, [auditData]);

  const [filteredPackages] = useFilters(packagesData, filters);

  const data = filteredByNamePackages.length
    ? filteredByNamePackages
    : filteredPackages;

  const dataSlices =
    data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const listDataPackages =
    sortDir === 'asc'
      ? dataSlices.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1))
      : dataSlices.sort((a, b) => (b[sortBy] < a[sortBy] ? -1 : 1));

  const noPackages = !packagesData.length;

  return (
    <>
      <AppLoader loading={loading} message={message}>
        <Grid container>
          <Grid
            item
            sm={12}
            md={active ? 8 : 10}
            lg={active ? 8 : 10}
            xl={active ? 8 : 10}
            className={classes.transition}
          >
            {noPackages && (
              <HelperText
                text={iMessage('info', 'noPackages')}
                actionText="Switch to globals"
                actionHandler={() => switchMode('global')}
              />
            )}
            {!noPackages && (
              <Paper className={classes.root} elevation={2}>
                <div className={classes.toolbar}>
                  <ToolbarView
                    title={iMessage('title', 'packages')}
                    total={packagesData.length}
                    mode={mode}
                    directory={directory}
                    selected={selected}
                    outdated={packagesOutdated}
                    packagesData={packagesData}
                    packagesInstallOptions={packagesInstallOptions}
                    fromSearch={fromSearch}
                    filters={filters}
                    scrollWrapper={() =>
                      scrollWrapper(wrapperRef && wrapperRef.current, 0)
                    }
                    toggleOptions={toggleOptions}
                    switchMode={switchMode}
                    reload={reload}
                    filteredByNamePackages={filteredByNamePackages}
                    setFilteredByNamePackages={setFilteredByNamePackages}
                  />
                </div>
                <Divider />
                <div className={classes.tableWrapper} ref={wrapperRef}>
                  <Table
                    padding="checkbox"
                    aria-labelledby="packages-list"
                    className={cn(classes.table, {
                      [classes.hasFilterBlur]: loading
                    })}
                  >
                    <HeaderView
                      packages={dataSlices.map(d => d.name)}
                      numSelected={selected.length}
                      rowCount={listDataPackages && listDataPackages.length}
                      sortBy={sortBy}
                      sortDir={sortDir}
                    />
                    <TableBody>
                      {listDataPackages &&
                        listDataPackages.map(
                          ({
                            name,
                            version,
                            latest,
                            isOutdated,
                            peerDependencies,
                            extraneous,
                            problems,
                            missing,
                            peerMissing,
                            __fromSearch,
                            __hasError,
                            __group
                          }) => {
                            const isPackageSelected =
                              selected.indexOf(name) > -1;
                            const installOptions = Array.isArray(
                              packagesInstallOptions
                            )
                              ? packagesInstallOptions.find(
                                installOption => installOption.name === name
                              )
                              : {};

                            const inOperation =
                              operationStatus !== 'idle' &&
                              operationCommand !== 'install' &&
                              operationPackages.indexOf(name) > -1;

                            const inPackageJson = packagesFromPackageJson.some(
                              pkg => {
                                /* eslint-disable-next-line */
                                const [pkgGroup, pkgDetails] = pkg;
                                const [pkgName] = Object.keys(pkgDetails);

                                return pkgName === name;
                              }
                            );

                            return (
                              <PackageItemView
                                key={`pkg-${name}`}
                                isSelected={isPackageSelected}
                                installOptions={installOptions}
                                addSelected={() =>
                                  dispatch(addSelected({ name }))
                                }
                                name={name}
                                peerDependencies={peerDependencies}
                                latest={latest}
                                version={version}
                                mode={mode}
                                missing={missing}
                                isOutdated={isOutdated}
                                extraneous={extraneous}
                                problems={problems}
                                viewPackage={viewPackageHandler}
                                inOperation={inOperation}
                                inAudit={auditPackages.includes(name)}
                                inPackageJson={inPackageJson}
                                peerMissing={peerMissing}
                                fromSearch={__fromSearch}
                                hasError={__hasError}
                                group={__group}
                              />
                            );
                          }
                        )}
                    </TableBody>
                    <PaginationView
                      rowCount={data && data.length}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      handleChangePage={(e, pageNo) => {
                        scrollWrapper(wrapperRef && wrapperRef.current, 0);
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
          <Grid
            item
            sm={12}
            md={active ? 4 : 2}
            lg={active ? 4 : 2}
            xl={active ? 4 : 2}
            className={classes.transition}
          >
            <PackageDetails
              toggleOptions={toggleOptions}
              addSelected={() =>
                dispatch(addSelected({ name: active ? active.name : null }))
              }
            />
          </Grid>
        </Grid>
      </AppLoader>

      <Dialog
        open={options.open}
        fullWidth
        onClose={() => {
          dispatch(clearInstallOptions());
          toggleOptions({
            open: false,
            single: false,
            name: null,
            version: null
          });
        }}
        aria-labelledby="install-options"
      >
        <DialogContent>
          <DialogOptionsView
            selected={selected.length ? selected : active ? [active.name] : []}
            packagesInstallOptions={packagesInstallOptions}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(clearInstallOptions());
              toggleOptions({
                open: false,
                single: false,
                name: null,
                version: null
              });
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (options.single) {
                dispatch(
                  installPackage({
                    ipcEvent: 'npm-install',
                    cmd: ['install'],
                    name: active.name,
                    version: options.version,
                    single: true
                  })
                );
              } else {
                dispatch(
                  installMultiplePackages({
                    ipcEvent: 'npm-install',
                    cmd: selected.map(() => 'install'),
                    multiple: true,
                    packages: selected
                  })
                );
              }

              toggleOptions({
                open: false,
                single: false,
                name: null,
                version: null
              });
            }}
            color="primary"
            autoFocus
          >
            Install
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Packages.propTypes = {
  classes: objectOf(string).isRequired
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
