/* eslint-disable */

/**
 * Packages component
 */

import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { objectOf, object } from 'prop-types';

import { withStyles } from '@material-ui/core';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
<<<<<<< c72704d15192f0efaaec41921e7332f403eceb4f

import useIpc from 'commons/hooks/useIpc';
import { getFiltered } from 'commons/utils';
import { APP_MODES } from 'constants/AppConstants';
=======
import AppLoader from '../layout/AppLoader';
>>>>>>> work in progress

import AppLoader from '../layout/AppLoader';
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import PackageItem from './PackageItem';

import { listStyles as styles } from '../styles/packagesStyles';
import {
  addSelected,
  setPackagesSuccess,
  setPackagesError,
  setPackagesOutdatedSuccess,
  clearSelected
} from 'models/packages/actions';

import { setPage, setPageRows } from 'models/ui/actions';

const mapState = state => ({
  manager: state.common.manager,
  mode: state.common.mode,
  directory: state.common.directory,
  page: state.common.page,
  rowsPerPage: state.common.rowsPerPage,
  filters: state.packages.filters,
  loading: state.packages.loading,
  packages: state.packages.packages,
  packagesOutdated: state.packages.packagesOutdated,
  selected: state.packages.selected
});

const Packages = props => {
  const { classes } = props;

  const {
    loading,
    packages,
    mode,
    page,
    filters,
    rowsPerPage,
    directory,
    manager,
    selected
  } = useMappedState(mapState);

  const [sortDir, setSortDir] = useState('asc');
  const [sortBy, setSortBy] = useState('name');
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const isSelected = name => selected.indexOf(name) !== -1;

  // useIpc hook to send and listenTo ipc events
  const [dependenciesSet, outdatedSet, error] = useIpc('ipc-event', {
    ipcEvent: 'get-packages',
    cmd: ['outdated', 'list'],
    mode,
    directory,
    inputs: [counter, manager]
  });

  const setSelected = name => dispatch(addSelected({ name }));
  const toggleSort = prop => {
    const newSortBy = sortDir === 'desc' ? 'asc' : 'desc';

    setSortBy(prop);
    setSortDir(newSortBy);
  };

  // project name and version
  const { name, version } = dependenciesSet || {};
  const dependencies = dependenciesSet.data || [];
  const outdated = outdatedSet.data || [];

  // dispatch actions
  useEffect(
    () => {
      if (error) {
<<<<<<< c72704d15192f0efaaec41921e7332f403eceb4f
        setPackagesError(error);
        return;
      }

      if (Array.isArray(dependencies) && dependencies.length) {
=======
        dispatch(setPackagesSuccess({ data: [], name: null, version: null }));
        dispatch(
          setPackagesOutdatedSuccess({
            data: []
          })
        );

        return;
      }

      if (Array.isArray(dependencies) && dependencies.length) {
        dispatch(setPackagesSuccess({ data: dependencies, name, version }));
      } else if (!name) {
        dispatch(
          setPackagesSuccess({ data: dependencies, name: null, version: null })
        );
      } else {
>>>>>>> work in progress
        dispatch(setPackagesSuccess({ data: dependencies, name, version }));
      }

      if (Array.isArray(outdated) && outdated.length) {
        dispatch(
          setPackagesOutdatedSuccess({
            data: outdated
          })
        );
      } else {
        dispatch(
          setPackagesOutdatedSuccess({
            data: []
          })
        );
      }
    },
    [dependenciesSet]
  );

  // sort packages
  useEffect(
    () => {
      // clone newPackages
      const data = dependencies && dependencies.slice(0);

      if (!data || !data.length) {
        return;
      }

      const sortedData =
        sortDir === 'asc'
          ? data.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1))
          : data.sort((a, b) => (b[sortBy] < a[sortBy] ? -1 : 1));

      dispatch(setPackagesSuccess(sortedData));
    },
    [sortDir, sortBy]
  );

  // filter packages
  const filteredPackages =
    filters && filters.length ? getFiltered(packages, filters) : [];

  // assign final data
  const data =
    Array.isArray(filteredPackages) && filteredPackages.length
      ? filteredPackages
      : packages;

  // pagination
  const dataSlices =
    data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <AppLoader loading={loading}>
      <Paper className={classes.root}>
        <div className={classes.toolbar}>
          <TableToolbar
            title="Packages"
            mode={mode}
            directory={directory}
            selected={selected}
            reload={() => setCounter(counter + 1)} // triggers render
          />
        </div>
<<<<<<< c72704d15192f0efaaec41921e7332f403eceb4f
        {dataSlices.length ? (
=======
        {!dataSlices.length ? (
>>>>>>> work in progress
          <React.Fragment>
            <Table
              className={cn(classes.tablelist, {
                [classes.hasFilterBlur]: loading
              })}
            >
              <TableHeader
                packages={dataSlices.map(d => d.name)}
                numSelected={Number(selected.length)}
                rowCount={(data && data.length) || 0}
                sortBy={sortBy}
                sortDir={sortDir}
                setSortBy={(e, prop) => setSortBy(prop)}
                toggleSort={(e, prop) => toggleSort(prop)}
                onSelected={(name, force) =>
                  dispatch(
                    addSelected({
                      name,
                      force
                    })
                  )
                }
                onClearSelected={() => dispatch(clearSelected())}
              />
              <TableBody>
                {dataSlices &&
                  dataSlices.map(pkg => {
                    const { name, version, latest, isOutdated, __group } = pkg;

                    return (
                      <PackageItem
                        key={`pkg-${pkg.name}`}
                        isSelected={isSelected}
                        setSelected={setSelected}
                        name={name}
                        version={version}
                        latest={latest}
                        isOutdated={isOutdated}
                        __group={__group}
                      />
                    );
                  })}
              </TableBody>
              <TableFooter
                rowCount={(data && data.length) || 0}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={(e, pageNo) =>
                  dispatch(setPage({ page: pageNo }))
                }
                handleChangePageRows={e =>
                  dispatch(setPageRows({ rowsPerPage: e.target.value || 10 }))
                }
              />
            </Table>{' '}
          </React.Fragment>
        ) : (
          <Typography className={classes.nodata} component="h4">
            No dependencies found
          </Typography>
        )}
      </Paper>
    </AppLoader>
  );
};

// Packages.propTypes = {
//   classes: objectOf.isRequired
// };

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
