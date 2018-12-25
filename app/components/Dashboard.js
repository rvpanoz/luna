/* eslint-disable */

/**
 * Dashboard
 */

import React from 'react';
import { objectOf, object } from 'prop-types';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import CardInfo from './layout/CardInfo';

const styles = () => ({
  root: {
    padding: 0,
    margin: 0
  }
});

const mapState = state => ({});

const Dashboard = props => {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            title="Total dependencies"
            description="49/50"
            type="info"
            color="info"
            text="Get More Space..."
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(Dashboard);
