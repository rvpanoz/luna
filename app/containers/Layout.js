/* eslint-disable */

/**
 * Layout component
 */

import React from 'react';
import { objectOf, object } from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Dashboard from 'components/Dashboard';
import { Packages, PackageDetails } from 'components/packages';

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
            <Grid item xs={12}>
              <Dashboard />
            </Grid>
          </Grid>
          <Grid container justify="flex-start">
            <Grid item xs={4}>
              <Packages />
            </Grid>
            <Grid item xs={6}>
              <PackageDetails />
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </div>
      </section>
    </div>
  );
};

// Layout.propTypes = {
//   classes: objectOf(object).isRequired
// };

export default withStyles(styles)(Layout);
