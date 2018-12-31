/* eslint-disable */

import { ipcRenderer, remote } from 'electron';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ModuleIcon from '@material-ui/icons/ViewModuleRounded';
import AddIcon from '@material-ui/icons/Add';

import { toggleLoader } from 'models/ui/actions';

import styles from './styles/notifications';

const mapState = state => ({
  manager: state.common.manager,
  mode: state.common.mode,
  directory: state.common.directory
});

const Notifications = props => {
  const { classes, notifications, close } = props;
  const { manager, mode, directory } = useMappedState(mapState);
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
      ipcEvent: 'install-packages',
      cmd: ['install'],
      name: peerName,
      version: 'latest',
      mode,
      directory
    });

    dispatch(
      toggleLoader({
        loading: true,
        message: `Installing ${peerName}..`
      })
    );

    close();
  };

  return (
    <ClickAwayListener onClickAway={e => console.log(e)}>
      <Grow in={true} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
        <Paper className={classes.dropdown}>
          <List dense>
            {notifications &&
              notifications.map((notification, idx) => {
                const { requiredBy, requires } = notification;

                return (
                  <ListItem key={`notification-${idx}`}>
                    <ListItemAvatar>
                      <Avatar color="primary">
                        <ModuleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`peer ${requires} missing`}
                      secondary={requiredBy}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Install"
                        onClick={e => handleInstall(requires.split('@')[0])}
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
          </List>
        </Paper>
      </Grow>
    </ClickAwayListener>
  );
};

export default withStyles(styles)(Notifications);
