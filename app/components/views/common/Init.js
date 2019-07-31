import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { directoryParameters } from 'commons/parameters';
import { iMessage } from 'commons/utils';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import styles from './styles/initForm';

const Init = ({ classes, enableInit }) => {
  const [initOptions, setInitOptions] = useState({ directory: null });
  const { directory } = initOptions || {};

  const startInitFlow = useCallback(() =>
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      directoryParameters,
      filePath => {
        if (filePath) {
          setInitOptions({
            ...initOptions,
            directory: filePath[0]
          })
          enableInit()
        }
      }
    ), [initOptions, enableInit]);

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
          classes={{
            root: classes.button
          }}
        >
          {iMessage('info', 'directorySelection')}
        </Button>
      </div>
    </div>
  </Paper>
}

Init.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  enableInit: PropTypes.func.isRequired
};

export default withStyles(styles)(Init);
