/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import useFilters from 'commons/hooks/useFilters';
import AppLoader from 'components/common/AppLoader';
import { PackageDetails } from 'components/views/package';
import { scrollWrapper } from 'commons/utils';

import {
  setPackagesStart,
  viewPackageStart,
  installMultiplePackages
} from 'models/packages/actions';
import {
  addSelected,
  setPage,
  setPageRows,
  setActivePage
} from 'models/ui/actions';
import {
  setMode,
  clearInstallOptions,
  addInstallOption
} from 'models/common/actions';

import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import PackageItem from './PackageItem';
import Options from './Options';

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
  npm: { operationStatus, operationPackages, operationCommand },
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
  operationCommand
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
    manager,
    selected,
    fromSearch,
    sortDir,
    sortBy,
    packagesInstallOptions,
    active,
    operationStatus,
    operationPackages,
    operationCommand
  } = useMappedState(mapState);

  /* eslint-disable-next-line */
  const [packagesFromPackageJson, setPackageJsonPackages] = useState([]);
  const [optionsOpen, toggleOptions] = useState(false);
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
          version
        }
      })
    );

  useEffect(() => {
    dispatch(
      setPackagesStart({
        channel: 'npm-list-outdated',
        options: {
          cmd: ['outdated', 'list'],
          mode
        }
      })
    );
  }, [mode, directory, dispatch]);

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

  return (
    <React.Fragment>
      <AppLoader loading={loading} message={message}>
        <Grid container>
          <Grid
            item
            md={active ? 8 : 11}
            lg={active ? 8 : 11}
            xl={active ? 8 : 11}
            className={classes.transition}
          >
            <Paper className={classes.root}>
              <div className={classes.toolbar}>
                <TableToolbar
                  title="Packages"
                  manager={manager}
                  total={(packagesData && packagesData.length) || 0}
                  mode={mode}
                  directory={directory}
                  selected={selected}
                  outdated={packagesOutdated}
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
              <div className={classes.tableWrapper} ref={wrapperRef}>
                {!packagesData || packagesData.length === 0 ? (
                  <Typography
                    variant="subtitle1"
                    className={classes.withPadding}
                  >
                    No dependencies found.
                  </Typography>
                ) : (
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
                                latest={latest}
                                version={version}
                                mode={mode}
                                missing={missing}
                                isOutdated={isOutdated}
                                fromSearch={fromSearch}
                                extraneous={extraneous}
                                problems={problems}
                                viewPackage={viewPackageHandler}
                                inOperation={inOperation}
                                inPackageJson={inPackageJson}
                                hasError={__hasError}
                                group={__group}
                              />
                            );
                          }
                        )}
                    </TableBody>
                    <TableFooter
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
                )}
              </div>
            </Paper>
          </Grid>
          <Grid
            item
            md={active ? 4 : 1}
            lg={active ? 4 : 1}
            xl={active ? 4 : 1}
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
        open={optionsOpen}
        fullWidth
        onClose={() => {
          dispatch(clearInstallOptions());
          toggleOptions(!optionsOpen);
        }}
        aria-labelledby="install-options"
      >
        <DialogContent>
          <Options
            selected={selected.length ? selected : active ? [active.name] : []}
            packagesInstallOptions={packagesInstallOptions}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(clearInstallOptions());
              toggleOptions(false);
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(
                installMultiplePackages({
                  ipcEvent: 'npm-install',
                  cmd: selected.length
                    ? selected.map(() => 'install')
                    : ['install'],
                  multiple: true,
                  packages: selected.length
                    ? selected
                    : active
                    ? [active.name]
                    : []
                })
              );
              toggleOptions(false);
            }}
            color="primary"
            autoFocus
          >
            Install
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

Packages.propTypes = {
  classes: objectOf(string).isRequired
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
