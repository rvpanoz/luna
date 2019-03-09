import { remote } from 'electron';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import { installPackages } from 'models/packages/actions';
import NotificationsHeader from './NotificationsHeader';
import NotificationsToolbar from './NotificationsToolbar';

import styles from './styles';

const mapState = ({
  common: { mode, directory, notifications },
  modules: {
    project: { name }
  }
}) => ({
  name,
  mode,
  directory,
  notifications
});

const parseRequiredBy = name => name && name.replace('required by', '').trim();
const parseRequired = (name, position) => name && name.split('@')[position];

const Notifications = ({ classes }) => {
  const [selected, setSelected] = useState([]);
  const { name, mode, directory, notifications } = useMappedState(mapState);
  const dispatch = useDispatch();

  const handleInstall = () => {
    remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        title: 'Confirmation',
        type: 'question',
        message: `Would you like to install the selected packages?`,
        buttons: ['Cancel', 'Install']
      },
      btnIdx => {
        if (Boolean(btnIdx) === true) {
          const parameters = {
            ipcEvent: 'install',
            cmd: ['install'],
            packages: selected,
            multiple: true,
            mode,
            directory
          };
          console.log(selected);
          // dispatch(installPackages(parameters));
        }
      }
    );

    return false;
  };

  const handleSelectAllClick = e => {
    if (e.target.checked) {
      const allSelected = notifications.map((n, idx) =>
        parseRequired(n.required, 0)
      );

      return setSelected(allSelected);
    }

    setSelected([]);
  };

  // TODO: fix selected values tip: use idx to place in specific index
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <Grid container spacing={16}>
      <Grid item md={10} lg={8} xl={8}>
        {notifications.length === 0 ? (
          <Typography variant="subtitle1">No problems found!</Typography>
        ) : (
          <Paper className={classes.root}>
            <NotificationsToolbar
              numSelected={selected.length || 0}
              handleInstall={handleInstall}
            />
            <div className={classes.tableWrapper}>
              <Table
                className={classes.table}
                aria-labelledby="notificationsHeader"
              >
                <NotificationsHeader
                  numSelected={selected.length || 0}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={notifications.length || 0}
                />
                <TableBody>
                  {notifications.map((n, idx) => {
                    const name = parseRequired(n.required, 0);

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, name)}
                        role="checkbox"
                        aria-checked={selected.indexOf(name) > -1}
                        tabIndex={-1}
                        key={`notification-item-${idx}`}
                        selected={selected.indexOf(name) > -1}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={selected.indexOf(name) > -1} />
                        </TableCell>
                        <TableCell>{parseRequiredBy(n.requiredBy)}</TableCell>
                        <TableCell>{parseRequired(n.required, 0)}</TableCell>
                        <TableCell>{parseRequired(n.required, 1)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

Notifications.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notifications);
