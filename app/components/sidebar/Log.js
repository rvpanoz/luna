import React, { useState, useEffect } from 'react';
import { string, objectOf, func, bool, object, arrayOf } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';

import styles from './styles';

const Log = ({ classes, log }) => {
  const [commandLog, setCommandLog] = useState(null);

  useEffect(() => {
    if (!log.length) {
      return;
    }

    const [command] = log;
    const { runningCommand } = command;
    const newCommand = runningCommand.substr(0, runningCommand.indexOf('--'));

    setCommandLog({
      runningCommand: newCommand,
      timestamp: command.timestamp,
    });
  }, [log]);

  if (!commandLog) {
    return null;
  }

  return (
    <div className={classes.log}>
      <Typography
        className={classes.command}
        variant="caption"
        component="div"
        color="textSecondary"
      >
        {`running: ${commandLog.runningCommand}`}
      </Typography>
      <CircularProgress
        size={15}
        thickness={5}
        className={classes.loader}
        color="inherit"
      />
    </div>
  );
};

Log.propTypes = {
  classes: objectOf(string).isRequired,
  log: arrayOf(object),
};

export default withStyles(styles)(Log);
