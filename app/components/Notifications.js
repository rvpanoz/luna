/**
 * Notifications
 */

import { ipcRenderer, remote } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
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
    <ClickAwayListener onClickAway={() => false}>
      <Grow
        in={Boolean(true)} // eslint complains without casting..
        id="menu-list"
        style={{ transformOrigin: '0 0 0' }}
      >
        <Paper className={classes.dropdown}>
          <List dense>
            {notifications &&
              notifications.map((notification, idx) => {
                const { requiredBy, requires } = notification;
                const parts = requires.split('@');
                const peerName = parts[0].length ? parts[0] : `@${parts[1]}`; // @ indicates namespace e.g @material-ui/core, @babel/core etc

                return (
                  <ListItem key={`notification-${idx + 1}`}>
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
                        onClick={() => handleInstall(peerName)}
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

Notifications.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  close: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default withStyles(styles)(Notifications);
