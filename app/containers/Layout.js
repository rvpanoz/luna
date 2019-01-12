/* eslint-disable */

/**
 * Layout component
 */

import React from 'react';
import { objectOf, string } from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Header from 'components/Header';
import Dashboard from 'components/Dashboard';
import { Packages, PackageDetails } from 'components/packages';

import styles from './styles/layout';

const Layout = props => {
  const { app, classes } = props;

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <section className={classes.header}>
        <Header title={app} />
      </section>
      <section className={classes.main}>
        <div className={classes.container}>
          <Grid container justify="space-between">
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Dashboard />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Packages />
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <PackageDetails />
            </Grid>
          </Grid>
        </div>
      </section>
    </div>
  );
};

Layout.propTypes = {
  app: string.isRequired,
  classes: objectOf(string).isRequired
};

export default withStyles(styles)(Layout);
