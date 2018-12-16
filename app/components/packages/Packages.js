/* eslint-disable */

import React, { useEffect, useCallback } from 'react';
import { withStyles } from '@material-ui/core';
import { merge } from 'ramda';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  CLEAR_SELECTED,
  SET_PACKAGES,
  SET_SELECTED_PACKAGE,
  TOGGLE_LOADER
} from '../../constants/ActionTypes';
import useIpc from '../../commons/hooks/useIpc';
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';

import { listStyles as styles } from './styles';

const options = {
  ipcEvent: 'get-packages',
  cmd: ['list']
};

const mapState = state => ({
  manager: state.common.manager,
  mode: state.common.mode,
  page: state.common.page,
  rowsPerPage: state.common.rowsPerPage,
  directory: state.common.directory,
  packages: state.packages.packages,
  selected: state.packages.selected
});

const Packages = props => {
  const { classes } = props;
  const {
    packages,
    mode,
    directory,
    manager,
    page,
    rowsPerPage,
    selected
  } = useMappedState(mapState);

  const dispatch = useDispatch();
  const isSelected = name => selected.indexOf(name) !== -1;

  const [newPackages, loading, error] = useIpc(
    'ipc-event',
    merge(options, {
      manager,
      mode,
      directory
    })
  );

  useEffect(
    () => {
      if (typeof newPackages === 'string' && !Boolean(newPackages.length)) {
        return;
      }

      dispatch({ type: SET_PACKAGES, packages: newPackages });
    },
    [newPackages, directory]
  );

  const dataSlices =
    packages &&
    packages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <section className={classes.root}>
      <div className={classes.toolbar}>
        <TableToolbar
          mode={mode}
          directory={directory}
          selected={selected}
          title="Packages"
        />
      </div>
      <Table className={classes.tableResponsive}>
        <TableHeader
          packages={dataSlices && dataSlices.map(pkg => pkg.name)}
          numSelected={Number(selected.length)}
          rowCount={rowsPerPage}
          onSelect={name =>
            dispatch({
              type: SET_SELECTED_PACKAGE,
              name,
              force: true
            })
          }
          onClearSelected={() =>
            dispatch({
              type: CLEAR_SELECTED
            })
          }
        />
        <TableBody>
          {loading ? (
            <CircularProgress />
          ) : (
            dataSlices &&
            dataSlices.map(pkg => {
              const { name, version } = pkg;

              return (
                <TableRow key={`pkg-${name}`}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(name)}
                      onClick={e =>
                        dispatch({
                          type: SET_SELECTED_PACKAGE,
                          name
                        })
                      }
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
            })
          )}
        </TableBody>
      </Table>
    </section>
  );
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
