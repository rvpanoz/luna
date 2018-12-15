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
import Dashboard from '../components/Dashboard';
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
          <Packages />
        </div>
      </section>
    </div>
  );
};

export default withStyles(styles)(Layout);
