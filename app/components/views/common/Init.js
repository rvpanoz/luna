/* eslint-disable  react/jsx-boolean-value */

import React from 'react';
import PropTypes from 'prop-types';
import { useCallback } from 'react'
import { remote } from 'electron';
import { useState } from 'react';
import { useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import { directoryParameters } from 'commons/parameters';
import { iMessage } from 'commons/utils';
import { runInit, runLock } from 'models/npm/actions';

import styles from './styles/initForm';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Init = ({ classes, onClose }) => {
  const [type, setType] = useState('init');
  const [initOptions, setInitOptions] = useState({ directory: null });
  const dispatch = useDispatch();

  const { directory } = initOptions || {};

  const startInitFlow = () =>
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      directoryParameters,
      filePath =>
        filePath &&
        setInitOptions({
          ...initOptions,
          directory: filePath[0]
        })
    );

  const onChangeType = () => {
    const newType = type === 'init' ? 'lock' : 'init';
    setType(newType)
  };

  const npmLock = useCallback(() => {
    dispatch(
      runLock({
        ipcEvent: 'npm-init-lock',
        cmd: ['install'],
        packageLock: true,
        directory
      })
    );

    onClose();
  }, [dispatch, onClose, directory]);

  const npmInit = useCallback(() => {
    dispatch(
      runInit({
        ipcEvent: 'npm-init',
        cmd: ['init'],
        directory
      })
    );

    onClose();
  }, [dispatch, onClose, directory]);

  return <Paper elevation={0}>
    <div className={classes.content}>
      <div className={classes.directory}>
        <Typography
          variant="h5"
        >
          {directory || 'No directory selected'}
        </Typography>
      </div>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={startInitFlow}
          variant="outlined"
        >
          {iMessage('info', 'directorySelection')}
        </Button>
      </div>
    </div>
    <div className={classes.options}>
      <FormControlLabel
        control={
          <Checkbox
            checked={type === 'lock'}
            disableRipple
            onClick={onChangeType}
          />
        }
        className={classes.formControl}
        label="package-lock only"
      />
    </div>
  </Paper>
}

Init.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(Init);
