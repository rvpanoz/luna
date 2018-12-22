/* eslint-disable */

/**
 * Packages component
 */

import React, { useEffect, useState, useCallback } from 'react';
import cn from 'classnames';
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

import { PACKAGE_GROUPS } from '../../constants/AppConstants';
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

const getStyles = loading => {
  return loading ? { filter: 'blur(15px)' } : null;
};

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

  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const isSelected = name => selected.indexOf(name) !== -1;

  const [newPackages, outdatedPackages, error] = useIpc('ipc-event', {
    ipcEvent: 'get-packages',
    cmd: ['list', 'outdated'],
    manager,
    mode,
    directory,
    counter
  });

  const setSelected = name => dispatch(addSelected({ name }));

  const isPackageOutdated = name => {
    return [
      Array.isArray(outdatedPackages) &&
        outdatedPackages.some(o => o.name === name),
      outdatedPackages.find(f => f.name === name)
    ];
  };

  /**
   * Hint: use counter to run effect again
   */
  useEffect(
    () => {
      if (typeof newPackages === 'object' && newPackages.length) {
        dispatch(setPackagesSuccess(newPackages));
      }

      if (typeof outdatedPackages === 'object' && outdatedPackages.length) {
        dispatch(setPackagesOutdatedSuccess(outdatedPackages));
      }

      return void 0;
    },
    [newPackages, outdatedPackages, counter]
  );

  const getFiltered = useCallback(
    () => {
      const groups = Object.keys(PACKAGE_GROUPS);
      let allFiltered = [];

      filters.forEach(filterName => {
        let filtered =
          packages &&
          packages.filter(pkg => {
            if (groups.indexOf(filterName) > -1) {
              return pkg['__group'] === filterName;
            }
            return !!pkg[filterName];
          });
        allFiltered = allFiltered.concat(filtered);
      });

      return allFiltered;
    },
    [filters]
  );

  const filteredPackages = getFiltered();
  const data =
    Array.isArray(filteredPackages) && filteredPackages.length
      ? filteredPackages
      : packages;

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
            reload={e => setCounter(counter + 1)} // triggers render
          />
        </div>

        <Table
          style={getStyles(loading)}
          className={cn(classes.tablelist, {
            [classes.none]: loading
          })}
        >
          <TableHeader
            packagesNames={dataSlices.map(d => d.name)}
            numSelected={Number(selected.length)}
            rowCount={(packages && packages.length) || 0}
            order="asc"
            orderBy="name"
            setPackages={sortedPackages => void 0}
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
                const [isOutdated, outdatePkg] = isPackageOutdated(pkg.name);

                return (
                  <PackageRow
                    {...pkg}
                    key={`pkg-${pkg.name}`}
                    isSelected={isSelected}
                    setSelected={setSelected}
                    isOutdated={isOutdated}
                    latest={outdatePkg && outdatePkg.latest}
                  />
                );
              })}
          </TableBody>
          <TableFooter
            rowCount={(packages && packages.length) || 0}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={(e, page) => dispatch(setPage({ page }))}
            handleChangePageRows={e =>
              dispatch(setPageRows({ rowsPerPage: e.target.value || 10 }))
            }
          />
        </Table>
      </Paper>
    </Loader>
  );
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
