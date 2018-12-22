/* eslint-disable */

/**
 * Layout component
 */

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import { Packages } from '../components/packages';
// import Dashboard from '../components/Dashboard';
import styles from './styles/layout';

const Layout = props => {
  const { classes } = props;

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <section className={classes.header}>
        <Header />
      </section>
      <section className={classes.main}>
        <div className={classes.container}>
          <Grid container justify="space-between">
            <Grid item xs={4}>
              <Packages />
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} />
                <Grid item xs={12} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </section>
    </div>
  );
};

export default withStyles(styles)(Layout);
