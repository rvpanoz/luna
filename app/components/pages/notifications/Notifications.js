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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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

const Notifications = ({ classes }) => {
  const [selected, setSelected] = useState([]);
  const { name, mode, directory, notifications } = useMappedState(mapState);
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
      const allSelected = notifications.map((n, idx) => idx);

      return setSelected(allSelected);
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
    <Grid container spacing={40}>
      <Grid item md={8} lg={8} xl={8}>
        <Paper className={classes.root}>
          <NotificationsToolbar numSelected={selected.length || 0} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <NotificationsHeader
                numSelected={selected.length || 0}
                onSelectAllClick={handleSelectAllClick}
                rowCount={notifications.length || 0}
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
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </Grid>
      <Grid item md={4} lg={4} xl={4}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {name || 'Global'}
            </Typography>
            <Typography component="p">{directory || null}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Notifications.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notifications);
