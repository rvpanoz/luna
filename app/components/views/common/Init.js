/* eslint-disable  react/jsx-boolean-value */

import React from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { directoryParameters } from 'commons/parameters';
import { iMessage } from 'commons/utils';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import styles from './styles/initForm';

const Init = ({ classes }) => {
  const [type, setType] = useState('init');
  const [initOptions, setInitOptions] = useState({ directory: null });

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
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Init);
