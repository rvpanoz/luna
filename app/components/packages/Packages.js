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
import Loader from '../layout/Loader';

import useIpc from '../../commons/hooks/useIpc';
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import PackageRow from './PackageRow';

import { getFiltered } from '../../commons/utils';
import { listStyles as styles } from './styles';

import {
  addSelected,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  clearSelected
} from '../../models/packages/actions';

import { setPage, setPageRows } from '../../models/ui/actions';

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
  // TODO: needs work to handle all events (install, uninstall etc)
  const [newPackages, outdatedPackages, error] = useIpc('ipc-event', {
    ipcEvent: 'get-packages',
    cmd: ['outdated', 'list'],
    mode,
    directory,
    inputs: [manager, counter]
  });

  if (error) {
    throw new Error(error);
  }

  const setSelected = name => dispatch(addSelected({ name }));
  const toggleSort = prop => {
    const newSortBy = sortDir === 'desc' ? 'asc' : 'desc';

    setSortBy(prop);
    setSortDir(newSortBy);
  };

  /**
   * TODO: figure out how not to dispatch
   * SET_PACKAGES_SUCCESS twice :-
   */
  useEffect(
    () => {
      if (typeof newPackages === 'object' && newPackages.length) {
        dispatch(setPackagesSuccess(newPackages));
      }

      if (typeof outdatedPackages === 'object' && outdatedPackages.length) {
        dispatch(setPackagesOutdatedSuccess(outdatedPackages));
      }
    },
    [newPackages, outdatedPackages, counter, manager]
  );

  // sort packages
  useEffect(
    () => {
      // clone newPackages
      const data = newPackages.slice(0);

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
    <Loader loading={loading}>
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
              dataSlices.map(pkg => (
                <PackageRow
                  key={`pkg-${pkg.name}`}
                  isSelected={isSelected}
                  setSelected={setSelected}
                  {...pkg}
                />
              ))}
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
        </Table>
      </Paper>
    </Loader>
  );
};

Packages.propTypes = {
  classes: objectOf(object).isRequired
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
