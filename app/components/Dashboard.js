/* eslint-disable */

/**
 * Dashboard
 */

import React from 'react';
import { useMappedState } from 'redux-react-hook';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import CardInfo from './layout/CardInfo';
import CardDetails from './layout/CardDetails';
import styles from './styles/dashboard';

import { camelize } from '../commons/utils';
import { APP_MODES } from '../constants/AppConstants';

const mapState = state => ({
  manager: state.common.manager,
  mode: state.common.mode,
  directory: state.common.directory,
  loading: state.packages.loading,
  packages: state.packages.packages,
  packagesOutdated: state.packages.packagesOutdated,
  projectName: state.packages.projectName,
  projectVersion: state.packages.projectVersion
});

const Dashboard = props => {
  const { classes } = props;
  const {
    packages,
    packagesOutdated,
    loading,
    directory,
    mode,
    manager,
    projectName,
    projectVersion
  } = useMappedState(mapState);

  return (
    <section className={classes.root}>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <CardDetails
            title={`${
              mode === APP_MODES.LOCAL
                ? `${projectName} v${projectVersion}`
                : 'Project'
            }`}
            description={packages ? packages.length : 0}
            subtext={directory || 'No working directory'}
            text={`Active manager: ${manager}`}
            loading={loading}
            avatar
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            title="Total dependencies"
            description={packages ? packages.length : 0}
            color="blue"
            text={directory || 'Global mode'}
            loading={loading}
            avatar
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            title="Outdated packages"
            description={packagesOutdated ? packagesOutdated.length : 0}
            color="orange"
            text="Updated"
            loading={loading}
            avatar
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(Dashboard);
