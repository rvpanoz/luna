import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { ControlTypes } from 'components/common';
import { addInstallOption } from 'models/common/actions';
import { iMessage } from 'commons/utils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import styles from './styles/commandOptions';

const Options = ({ classes, active, selected, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const packages = selected.length ? selected : active ? [active.name] : [];

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onClose}
      aria-labelledby="install-options"
    >
      <DialogContent>
        <div>
          <Typography variant="subtitle1" className={classes.title}>
            {iMessage('title', 'installationOptions')}
          </Typography>
          <Divider />
          <List dense className={classes.list}>
            {packages.map((packageName) => (
              <ListItem key={packageName}>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">{packageName}</Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <ControlTypes
                    packageName={packageName}
                    onSelect={({ name, options }) =>
                      dispatch(
                        addInstallOption({
                          name,
                          options,
                        })
                      )
                    }
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dispatch(clearInstallOptions());
            toggleOptions({
              open: false,
              single: false,
              name: null,
              version: null,
            });
          }}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (options.single) {
              dispatch(
                installPackage({
                  ipcEvent: 'npm-install',
                  cmd: ['install'],
                  name: active.name,
                  version: options.version,
                  single: true,
                })
              );
            } else {
              dispatch(
                installMultiplePackages({
                  ipcEvent: 'npm-install',
                  cmd: selected.map(() => 'install'),
                  multiple: true,
                  packages: selected,
                })
              );
            }

            toggleOptions({
              open: false,
              single: false,
              name: null,
              version: null,
            });
          }}
          color="primary"
          autoFocus
        >
          Install
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Options.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Options);
