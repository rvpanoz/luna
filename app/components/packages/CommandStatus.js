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

import { AppLoader } from 'components/common';

import styles from './styles/commandsStatus';

const CommandStatus = ({
  classes,
  isOpen,
  status,
  command,
  packages,
  onClose,
}) => {
  const dispatch = useDispatch();

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onClose}
      aria-labelledby="commands-status"
    >
      <DialogContent>
        <div>
          <Typography variant="subtitle1" className={classes.title}>
            Please wait
          </Typography>
          <Divider />
          <List dense className={classes.list}>
            {packages.map((pkg, idx) => {
              return (
                <ListItem key={pkg}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1">
                        {command}&nbsp;{pkg}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="subtitle1">
                      <AppLoader
                        loading={status === 'running'}
                        relative
                        mini
                      ></AppLoader>
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

CommandStatus.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(CommandStatus);
