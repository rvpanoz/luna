/* eslint-disable */

/**
 * Terminal component
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/terminal';

const Terminal = props => {
  const {
    classes,
    command = 'running: npm outdated --json --depth=0 --parseable --long -g'
  } = props;

  return (
    <div className={classes.terminal}>
      <div className={classes.code}>
        {command}
        <span className={classes.cursor} />
      </div>
    </div>
  );
};

export default withStyles(styles)(Terminal);
