import { ipcRenderer, remote } from 'electron';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';

import NotificationsHeader from './NotificationsHeader';
import NotificationsToolbar from './NotificationsToolbar';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

const mapState = ({ common: { manager, mode, directory, notifications } }) => ({
  manager,
  mode,
  directory,
  notifications
});

const Notifications = ({ classes }) => {
  const [selected, setSelected] = useState([]);
  const { manager, mode, directory, notifications } = useMappedState(mapState);
  const dispatch = useDispatch();

  const handleInstall = peerName => {
    remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        title: 'Confirmation',
        type: 'question',
        message: `Would you like to install ${peerName}?`,
        buttons: ['Cancel', 'Install']
      },
      btnIdx => {
        if (Boolean(btnIdx) === true) {
          console.log(peerName);
        }
      }
    );

    return false;
  };

  const handleSelectAllClick = e => {
    if (e.target.checked) {
      const allSelected = notifications.map(n, idx => idx);
      setSelected(allSelected);
      return;
    }

    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <NotificationsToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <NotificationsHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {notifications.map((n, idx) => {
                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, idx)}
                    role="checkbox"
                    aria-checked={selected.indexOf(idx) > -1}
                    tabIndex={-1}
                    key={`notification-item-${idx}`}
                    selected={selected.indexOf(idx) > -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={selected.indexOf(idx) > -1} />
                    </TableCell>
                    <TableCell>{n.requiredBy}</TableCell>
                    <TableCell>{n.required}</TableCell>
                    <TableCell align="right">{n.type}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Paper>
  );
};

Notifications.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notifications);
