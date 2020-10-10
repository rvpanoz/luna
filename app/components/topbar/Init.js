import React from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { iMessage, showDialog } from 'commons/utils';
import styles from './styles/init';

const EMPTY_DIR = 'No directory selected';

const Init = ({ classes, onSelectDirectory }) => {
  const [directory, setDirectory] = useState('');

  const startInitFlow = () => {
    const dialogOptions = {
      title: 'Choose directory',
      buttonLabel: 'Open',
      properties: ['openDirectory'],
    };

    const dialogHandler = ({ filePaths }) => {
      if (filePaths && Array.isArray(filePaths)) {
        const [directory] = filePaths;

        setDirectory(directory);
        onSelectDirectory(directory);
      }
    };

    return showDialog(dialogHandler, { mode: 'file', ...dialogOptions });
  };

  return (
    <Paper elevation={0}>
      <div className={classes.content}>
        <div className={classes.directory}>
          <Typography variant="h5">{directory || EMPTY_DIR}</Typography>
        </div>
        <div className={classes.actions}>
          <Button
            color="primary"
            onClick={startInitFlow}
            variant="outlined"
            classes={{
              root: classes.button,
            }}
          >
            {iMessage('info', 'directorySelection')}
          </Button>
        </div>
      </div>
    </Paper>
  );
};

Init.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onNpmInit: PropTypes.func.isRequired,
};

export default withStyles(styles)(Init);
