/* eslint-disable react/require-default-props */

import { remote } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'redux-react-hook';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import Typography from '@material-ui/core/Typography';

import { installPackages } from 'models/packages/actions';
import styles from './styles/installFromSources';

const InstallFromSource = ({ classes, mode, directory, close }) => {
  const dispatch = useDispatch();

  return (
    <div className={classes.paper}>
      <List dense>
        <ListItem key="project-install" className={classes.listItem}>
          <ListItemText
            primary={
              <Typography className={classes.title}>package.json</Typography>
            }
            secondary={
              <Typography
                className={classes.description}
                variant="caption"
                component="p"
              >
                Install the dependencies in the local node_modules folder. In
                global mode, it installs the current package context (ie, the
                current working directory) as a global package.
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              color="primary"
              title="Install from .package.json"
              aria-label="action"
              onClick={() =>
                remote.dialog.showMessageBox(
                  remote.getCurrentWindow(),
                  {
                    title: 'Install from package.json',
                    type: 'question',
                    message: `Do you want to install the dependencies from package.json file?`,
                    buttons: ['Cancel', 'Install']
                  },
                  btnIdx => {
                    if (Boolean(btnIdx) === true) {
                      const parameters = {
                        ipcEvent: 'install',
                        cmd: ['install'],
                        packageJson: true,
                        mode,
                        directory
                      };

                      dispatch(installPackages(parameters));
                      close();
                    }
                  }
                )
              }
            >
              <ArrowRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
};

InstallFromSource.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string.isRequired,
  directory: PropTypes.string,
  close: PropTypes.func.isRequired
};

export default withStyles(styles)(InstallFromSource);
