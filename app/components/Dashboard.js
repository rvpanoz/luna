/* eslint-disable */

/**
 * Dashboard
 */

import React from 'react';
import { useMappedState } from 'redux-react-hook';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import CardInfo from './layout/CardInfo';
import styles from './styles/dashboard';

const mapState = state => ({
  mode: state.common.mode,
  directory: state.common.directory,
  loading: state.packages.loading,
  packages: state.packages.packages,
  packagesOutdated: state.packages.packagesOutdated
});

const Dashboard = props => {
  const { classes } = props;
  const {
    packages,
    packagesOutdated,
    loading,
    directory,
    mode
  } = useMappedState(mapState);

  return (
    <section className={classes.root}>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            title="Total dependencies"
            description={packages ? packages.length : 0}
            color="green"
            text={directory || 'Global mode'}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            title="Outdated packages"
            description={packagesOutdated ? packagesOutdated.length : 0}
            color="orange"
            text="Updated"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            title="Problems"
            description={0}
            color="red"
            text="problems"
            loading={loading}
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(Dashboard);
