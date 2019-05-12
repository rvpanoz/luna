import { remote } from 'electron';
import React, { useState } from 'react';
import { useDispatch } from 'redux-react-hook';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { directoryParameters } from 'commons/parameters';
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
        channel: 'ipc-event',
        ipcEvent: 'init',
        cmd: ['init'],
        mode: 'local',
        directory: initOptions.directory
      })
    );

    onClose();
  };

  return (
    <section className={classes.root}>
      <Typography>
        You can add a package.json file to your package to make it easy for
        others to manage and install.
      </Typography>
      {initOptions.directory ? (
        <div className={classes.options}>
          <Typography>Directory</Typography>
          <Typography>{initOptions.directory}</Typography>
        </div>
      ) : (
        <div className={classes.options}>
          <Button color="default" onClick={startInitFlow} variant="outlined">
            Select directory
          </Button>
          <Typography variant="caption" className={classes.caption}>
            Note: npm init will run with the default parameters.
          </Typography>
        </div>
      )}
      <Divider light />
      <div className={classes.actions}>
        <Button onClick={() => onClose()} color="secondary">
          Cancel
        </Button>
        <Button
          disabled={!initOptions.directory}
          onClick={npmInit}
          color="primary"
          autoFocus
        >
          Create
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
