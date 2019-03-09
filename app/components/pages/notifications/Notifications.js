import { ipcRenderer, remote } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import AddIcon from '@material-ui/icons/Add';

import { toggleLoader } from 'models/ui/actions';

import styles from './styles';

const mapState = ({ common: { manager, mode, directory, notifications } }) => ({
  manager,
  mode,
  directory,
  notifications
});

const Notifications = ({ classes }) => {
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
          handleAction(peerName);
        }
      }
    );

    return false;
  };

  const handleAction = peerName => {
    ipcRenderer.send('ipc-event', {
      activeManager: manager,
      ipcEvent: 'install',
      cmd: ['install'],
      packages: [peerName],
      mode,
      directory
    });

    dispatch(
      toggleLoader({
        loading: true,
        message: `Installing ${peerName}..`
      })
    );
  };

  return (
    <section className={classes.root}>
      <Grid container>
        <Grid item md={8} lg={8} xl={8}>
          <Paper elevation={2}>
            <List dense>
              {notifications &&
                notifications.map((notification, idx) => {
                  const { requiredBy, required, type } = notification;
                  const peerName = required && required.split('@');

                  return (
                    <ListItem key={`notification-item${idx}`}>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                          {type === 'ERROR' && <ErrorIcon />}
                          {type === 'WARNING' && <WarningIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={required} secondary={requiredBy} />
                      <ListItemSecondaryAction>
                        <div>
                          <Tooltip title="Install peer">
                            <IconButton
                              aria-label="Install"
                              onClick={() => handleInstall(peerName[0])}
                            >
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
};

Notifications.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Notifications);
