/* eslint-disable */

import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { merge } from 'ramda';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { SET_PACKAGES } from '../../constants/ActionTypes';
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
  packages: state.packages.packages
});

const Packages = props => {
  const { classes } = props;
  const {
    packages,
    mode,
    directory,
    manager,
    page,
    rowsPerPage
  } = useMappedState(mapState);
  const dispatch = useDispatch();

  const [newPackages, error] = useIpc(
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
      <div className={classes.bar}>
        <TableToolbar
          mode={mode}
          directory={directory}
          selected={[]}
          title="Packages"
        />
      </div>
      <Table className={classes.tableResponsive}>
        <TableHeader />
        <TableBody>
          {dataSlices &&
            dataSlices.map(pkg => {
              const { name, version } = pkg;

              return (
                <TableRow key={`pkg-${name}`}>
                  <TableCell padding="checkbox">
                    <Checkbox onClick={e => console.log(e, name)} />
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
      </Table>
    </section>
  );
};

const withStylesPackages = withStyles(styles)(Packages);
export default withStylesPackages;
