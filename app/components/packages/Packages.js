/* eslint-disable */

/**
 * Packages component
 */

import React, { useEffect } from 'react';
import cn from 'classnames';
import { withStyles } from '@material-ui/core';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import useIpc from '../../commons/hooks/useIpc';
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
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
    rowsPerPage,
    directory,
    manager,
    selected
  } = useMappedState(mapState);

  const dispatch = useDispatch();
  const isSelected = name => selected.indexOf(name) !== -1;

  const [newPackages, outdatedPackages, error] = useIpc('ipc-event', {
    ipcEvent: 'get-packages',
    cmd: ['list', 'outdated'],
    manager,
    mode,
    directory
  });

  useEffect(
    () => {
      if (typeof newPackages === 'object' && newPackages.length) {
        dispatch(setPackagesSuccess(newPackages));
      }

      if (typeof outdatedPackages === 'object' && outdatedPackages.length) {
        dispatch(setPackagesOutdatedSuccess(outdatedPackages));
      }
    },
    [newPackages, outdatedPackages]
  );

  const dataSlices =
    packages &&
    packages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <section className={classes.root}>
      <div className={classes.toolbar}>
        <TableToolbar
          title="Packages"
          mode={mode}
          directory={directory}
          selected={selected}
        />
      </div>
      {loading && <CircularProgress />}
      <Table
        style={getStyles(loading)}
        className={cn(classes.tableResponsive, {
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
              const { name, version } = pkg;

              return (
                <TableRow key={`pkg-${name}`}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(name)}
                      onClick={e => dispatch(addSelected({ name }))}
                    />
                  </TableCell>
                  <TableCell padding="none" className={classes.tableCell}>
                    <span
                      style={{
                        display: 'inline-flex',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {name}
                    </span>
                  </TableCell>
                  <TableCell padding="none" className={classes.tableCell}>
                    {version}
                  </TableCell>
                </TableRow>
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
    </section>
  );
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
