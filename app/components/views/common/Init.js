import React from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import { useState } from 'react';
import { useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { directoryParameters } from 'commons/parameters';
import { iMessage } from 'commons/utils';
import { runInit } from 'models/npm/actions';

import styles from './styles/initForm';

const InitView = ({ classes, onClose }) => {
  const [initOptions, setInitOptions] = useState({ directory: null });
  const dispatch = useDispatch();

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

  const npmInit = () => {
    dispatch(
      runInit({
        ipcEvent: 'npm-init',
        cmd: ['init'],
        directory: initOptions.directory
      })
    );

    onClose();
  };

  return (
    <section className={classes.root}>
      <Typography variant="body2">
        {iMessage('info', 'createPackageJsonHelperText')}
      </Typography>
      {initOptions.directory ? (
        <div className={classes.options}>
          <Typography>{iMessage('info', 'directory')}</Typography>
          <Typography>{initOptions.directory}</Typography>
        </div>
      ) : (
        <div className={classes.options}>
          <Button color="default" onClick={startInitFlow} variant="outlined">
            {iMessage('info', 'directorySelection')}
          </Button>
          <Typography variant="caption" className={classes.caption}>
            {iMessage('info', 'createPackageJsonNote')}
          </Typography>
        </div>
      )}
      <Divider light />
      <div className={classes.actions}>
        <Button onClick={() => onClose()} color="secondary">
          {iMessage('action', 'cancel')}
        </Button>
        <Button
          disabled={!initOptions.directory}
          onClick={npmInit}
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
