import React from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import { useState } from 'react';
import { useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { directoryParameters } from 'commons/parameters';
import { iMessage } from 'commons/utils';
import { runInit, runLock } from 'models/npm/actions';

import styles from './styles/initForm';

const InitView = ({ classes, onClose }) => {
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

  const npmLock = () => {
    dispatch(
      runLock({
        ipcEvent: 'npm-init-lock',
        cmd: ['install'],
        packageLock: true,
        directory
      })
    );

    onClose();
  }

  const npmInit = () => {
    dispatch(
      runInit({
        ipcEvent: 'npm-init',
        cmd: ['init'],
        directory
      })
    );

    onClose();
  };

  return (
    <section className={classes.root}>
      <Typography variant="body2">
        {iMessage('info', 'createPackageJsonHelperText')}
      </Typography>
      <div className={classes.options}>
        <Button color="default" onClick={startInitFlow} variant="outlined" disabled={Boolean(directory)}>
          {iMessage('info', 'directorySelection')}
        </Button>
        <FormControlLabel
          control={
            <Checkbox
              checked={type === 'lock'}
              disableRipple
              onClick={() => setType(type === 'init' ? 'lock' : 'package')}
            />
          }
          className={classes.formControl}
          label="package-lock only"
        />
        {directory && <Typography className={classes.directory} variant="body2" color="textSecondary">{directory}</Typography>}
      </div>
      <Divider light />
      <Typography variant="caption" className={classes.caption}>
        {iMessage('info', 'createPackageJsonNote')}
      </Typography>
      <div className={classes.actions}>
        <Button onClick={() => onClose()} color="secondary">
          {iMessage('action', 'cancel')}
        </Button>
        <Button
          disabled={!initOptions.directory}
          onClick={type === 'lock' ? npmLock : npmInit}
          color="primary"
          autoFocus
        >
          {iMessage('action', 'create')}
        </Button>
      </div>
    </section>
  );
};

InitView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(InitView);
