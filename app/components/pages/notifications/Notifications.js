/* eslint-disable */

import { remote } from 'electron';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import semver from 'semver';
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

const mapState = ({ common: { mode, directory, notifications } }) => ({
  mode,
  directory,
  notifications
});

const parseRequiredBy = name => name && name.replace('required by', '').trim();
const parseRequired = (name, position) => name && name.split('@')[position];

const Notifications = ({ classes }) => {
  const [selected, setSelected] = useState([]);
  const { mode, directory, notifications } = useMappedState(mapState);
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
        if (btnIdx) {
          const packages = selected.map((pkg, idx) => {});

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
  };

  const handleSelectAllClick = e => {
    if (e.target.checked) {
      const allSelected = notifications.map((n, idx) => {
        const name = parseRequired(n.required, 0);
        const version = parseRequired(n.required, 1);
        const { raw } = semver.coerce(version);

        return `${name}-${raw}`;
      });

      return setSelected(allSelected);
    }

    setSelected([]);
  };

  const handleClick = (event, name, version) => {
    const needle = `${name}-${version}`;
    const selectedIndex = selected.indexOf(needle);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, needle);
    } else if (selectedIndex >= 0) {
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
                    const version = parseRequired(n.required, 1);
                    const { raw } = semver.coerce(version);

                    const isSelected = selected.indexOf(`${name}-${raw}`) > -1;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, name, raw)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={`notification-item-${idx}`}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell>{parseRequiredBy(n.requiredBy)}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{raw}</TableCell>
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
