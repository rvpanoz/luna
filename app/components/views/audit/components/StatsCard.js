import React from 'react';
import { objectOf, string } from 'prop-types';
import { withStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from '../styles/statsCard';

const StatsCard = ({ classes, title }) => (
  <Paper className={classes.root}>
    <div className={classes.content}>
      <Typography component="p">{title}</Typography>
    </div>
  </Paper>
);

StatsCard.propTypes = {
  classes: objectOf(string).isRequired,
  title: string.isRequired
};

export default withStyles(styles)(StatsCard);
