import { ipcRenderer, remote } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

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
import styles from './styles';

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
      ipcEvent: 'install',
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
      <Paper className={classes.dropdown}>
        <List dense>
          {notifications &&
            notifications.map((notification, idx) => {
              const { requiredBy, required } = notification;

              return (
                <ListItem key={`notification-${idx + 1}`}>
                  <ListItemAvatar>
                    <Avatar color="primary">
                      <ModuleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={required} secondary={requiredBy} />
                  <ListItemSecondaryAction>
                    <div>
                      <Tooltip title="Install peer">
                        <IconButton
                          aria-label="Install"
                          onClick={() => handleInstall(required)}
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
    </ClickAwayListener>
  );
};

Notifications.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  close: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(Notifications);
