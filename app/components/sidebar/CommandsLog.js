import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

import styles from './styles';

const CommandsLog = ({ classes, logs }) => (
  <div className={classes.log}>
    <List dense>
      {logs.map(({ runningCommand, timestamp }, idx) => (
        <ListItem key={`cmdlog-${idx.toString()}`}>
          <div className={classes.flex}>
            <Typography
              className={classes.command}
              color="textSecondary"
              variant="caption"
            >
              {runningCommand}
            </Typography>
            <Typography
              className={classes.command}
              color="textSecondary"
              variant="caption"
            >
              {timestamp}
            </Typography>
          </div>
        </ListItem>
      ))}
    </List>
  </div>
);

export default withStyles(styles)(CommandsLog);
