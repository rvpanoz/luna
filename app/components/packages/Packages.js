import { ipcRenderer } from 'electron';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { objectOf, string } from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { useFilters } from 'commons/hooks';
import { HelperText } from 'components/common';
import { scrollWrapper, iMessage } from 'commons/utils';
import {
  setPackagesStart,
  viewPackageStart,
  installPackage,
  installMultiplePackages,
} from 'models/packages/actions';
import {
  addSelected,
  setPage,
  setPageRows,
  setActivePage,
} from 'models/ui/actions';
import { setMode, clearInstallOptions } from 'models/common/actions';
import Toolbar from './Toolbar';
import TableHeader from './Header';
import PackageItem from './PackageItem';
import Pagination from './Pagination';
import CommandOptions from './CommandOptions';
import PackageDetails from './PackageDetails';
import { Loader } from '../common/loader';
import { Widget } from '../common/widget';
import styles from './styles/packages';

const mapState = ({
  common: {
    directory,
    manager,
    mode,
    operations: { packagesInstallOptions, action },
  },
  packages: {
    active,
    packagesFromSearch,
    packagesData,
    packagesOutdated,
    metadata: { fromSearch },
  },
  npm: { operationStatus, operationPackages, operationCommand },
  ui: {
    paused,
    loaders: { loader, packageLoader },
    pagination: { page, rowsPerPage },
    filtering: { filters },
    sorting: { sortBy, sortDir },
    selected,
  },
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
  packagesFromSearch,
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
});

export const initialDialogOptions = {
  activeDialog: null,
  cmd: [],
  single: false,
  isTerminated: false,
  manager: 'npm',
  name: '',
  version: '',
};

const Packages = ({ classes }) => {
  const {
    loader: { loading, message },
    packagesFromSearch,
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
  } = useMappedState(mapState);

  const [dialogOptions, setDialogOptions] = useState(initialDialogOptions);
  const [filteredByNamePackages, setFilteredByNamePackages] = useState([]);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  const reload = useCallback(() => {
    dispatch(setActivePage({ page: 'packages', paused: false }));
    dispatch(
      setPackagesStart({
        channel: 'npm-list-outdated',
        options: {
          cmd: ['outdated', 'list'],
        },
      })
    );
  }, [dispatch]);

  const switchModeHandler = useCallback(
    (appMode, appDirectory) => {
      dispatch(setMode({ mode: appMode, directory: appDirectory }));
      dispatch(setActivePage({ page: 'packages', paused: false }));

      if (fromSearch) {
        dispatch(
          setPackagesStart({
            channel: 'npm-list-outdated',
            options: {
              cmd: ['outdated', 'list'],
            },
          })
        );
      }
    },
    [dispatch, fromSearch]
  );

  const viewPackageHandler = useCallback(
    (name, version) =>
      dispatch(
        viewPackageStart({
          channel: 'npm-view',
          options: {
            cmd: ['view'],
            name,
            version: name === 'npm' ? null : version,
          },
        })
      ),
    [dispatch]
  );

  const onCommandOptionsClose = () => {
    dispatch(clearInstallOptions());
    setDialogOptions(initialDialogOptions);
  };

  const onCommandStatusClose = () => {
    setDialogOptions(initialDialogOptions);
  };

  const renderHelperText = () => {
    return (
      <HelperText
        text={iMessage('info', 'noPackages')}
        actionText={
          mode === 'local' ? iMessage('title', 'switchToGlobals') : null
        }
        actionHandler={
          mode === 'local' ? () => switchModeHandler('global') : null
        }
      />
    );
  };

  useEffect(() => {
    dispatch(
      setPackagesStart({
        channel: 'npm-list-outdated',
        options: {
          cmd: ['outdated', 'list'],
          mode,
          directory,
        },
      })
    );
  }, [mode, directory, dispatch]);

  const noPackages =
    Boolean(!packagesData || !packagesData.length) && !fromSearch;

  const activePackages = fromSearch ? packagesFromSearch : packagesData;
  const [filteredPackages] = useFilters(activePackages, filters);

  const dataPackages = filteredByNamePackages.length
    ? filteredByNamePackages
    : filteredPackages;

  const dataSlices =
    dataPackages &&
    dataPackages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const listDataPackages =
    sortDir === 'asc'
      ? dataSlices.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1))
      : dataSlices.sort((a, b) => (b[sortBy] < a[sortBy] ? -1 : 1));

  if (noPackages && !loading) {
    return renderHelperText();
  }

  return (
    <>
      <Loader loading={loading} message={message}>
        <Grid container>
          <Grid
            item
            md={active ? 8 : 10}
            lg={active ? 8 : 10}
            xl={active ? 8 : 10}
            className={classes.transition}
          >
            <Paper elevation={2}>
              <div className={classes.toolbar}>
                <Toolbar
                  title={iMessage('title', 'packages')}
                  total={
                    fromSearch ? packagesFromSearch.length : packagesData.length
                  }
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
                  showCommandOptions={() =>
                    setDialogOptions({
                      activeDialog: 'command-options',
                      single: false,
                    })
                  }
                  switchMode={switchModeHandler}
                  reload={reload}
                  filteredByNamePackages={filteredByNamePackages}
                  setFilteredByNamePackages={setFilteredByNamePackages}
                />
              </div>
              <Divider />
              <div className={classes.tableWrapper} ref={wrapperRef}>
                <Table
                  aria-labelledby="packages-list"
                  className={cn(classes.table, {
                    [classes.hasFilterBlur]: loading,
                  })}
                >
                  <TableHeader
                    packages={dataPackages.map((pkg) => pkg.name)}
                    numSelected={selected.length}
                    rowCount={dataPackages && dataPackages.length}
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
                          __group,
                        }) => {
                          const isPackageSelected = selected.indexOf(name) > -1;
                          const isArrayOptions = Array.isArray(
                            packagesInstallOptions
                          );

                          const installOptions = isArrayOptions
                            ? packagesInstallOptions.find(
                                (installOption) => installOption.name === name
                              )
                            : {};

                          const inOperation =
                            operationStatus !== 'idle' &&
                            operationCommand !== 'install' &&
                            operationPackages.indexOf(name) > -1;

                          return (
                            <PackageItem
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
                              peerMissing={peerMissing}
                              fromSearch={__fromSearch}
                              hasError={__hasError}
                              group={__group}
                            />
                          );
                        }
                      )}
                  </TableBody>
                  <Pagination
                    rowCount={dataPackages && dataPackages.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={(e, pageNo) => {
                      scrollWrapper(wrapperRef && wrapperRef.current, 0);
                      dispatch(setPage({ page: pageNo }));
                    }}
                    handleChangePageRows={(e) =>
                      dispatch(setPageRows({ rowsPerPage: e.target.value }))
                    }
                  />
                </Table>
              </div>
            </Paper>
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
              showCommandOptions={(options) =>
                setDialogOptions({
                  activeDialog: 'command-options',
                  ...options,
                })
              }
            />
          </Grid>
        </Grid>
      </Loader>
      <CommandOptions
        isOpen={dialogOptions.activeDialog === 'command-options'}
        single={dialogOptions.single}
        version={dialogOptions.version}
        active={active}
        selected={selected}
        onClose={onCommandOptionsClose}
      />
    </>
  );
};

Packages.propTypes = {
  classes: objectOf(string).isRequired,
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
