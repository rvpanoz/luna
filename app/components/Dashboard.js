/* eslint-disable */

/**
 * Dashboard
 */

import React from 'react';
import { useMappedState } from 'redux-react-hook';
import { withStyles } from '@material-ui/core';
import cn from 'classnames';
import Grid from '@material-ui/core/Grid';
import CardInfo from './layout/CardInfo';
import CardDetails from './layout/CardDetails';
import styles from './styles/dashboard';
import { APP_MODES } from 'constants/AppConstants';

const mapState = state => ({
  manager: state.common.manager,
  mode: state.common.mode,
  directory: state.common.directory,
  loading: state.packages.loading,
  lastUpdatedAt: state.packages.lastUpdatedAt,
  packages: state.packages.packages,
  packagesOutdated: state.packages.packagesOutdated,
  projectName: state.packages.projectName,
  projectVersion: state.packages.projectVersion
});

const Dashboard = props => {
  const { classes, theme } = props;
  const {
    packages,
    packagesOutdated,
    loading,
    directory,
    mode,
    manager,
    projectName,
    projectVersion,
    lastUpdatedAt
  } = useMappedState(mapState);

  const renderProjectStats = () => (
    <div className={classes.flexContainer}>
      <div className={classes.flexContainerItem}>Manager:&nbsp;{manager}</div>
      <div className={cn(classes.flexContainerItem, classes.textRight)}>
        Problems:&nbsp;0
      </div>
    </div>
  );

  const renderDependenciesStats = () => (
    <div className={classes.flexContainer}>
      <div className={classes.flexContainerItem}>Updated at</div>
      <div className={cn(classes.flexContainerItem, classes.textRight)}>
        {lastUpdatedAt}
      </div>
    </div>
  );

  const renderStats = () => (
    <div className={classes.flexContainer}>
      <div className={classes.flexContainerItem}>Statistics</div>
    </div>
  );

  const {
    palette: { primary, secondary }
  } = theme || {};

  return (
    <section className={classes.root}>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <CardDetails
            id="card-1"
            title={`${
              mode === APP_MODES.LOCAL && projectName
                ? `${projectName} v${projectVersion}`
                : 'Project'
            }`}
            subtext={directory || 'No working directory'}
            text={renderProjectStats()}
            loading={loading}
            avatar
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            id="card-2"
            title="Total dependencies"
            description={packages ? packages.length : 0}
            color="red"
            text={renderDependenciesStats()}
            loading={loading}
            avatar
            type="update"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            id="card-3"
            title="Outdated packages"
            description={packagesOutdated ? packagesOutdated.length : 0}
            color="blue"
            text={renderStats()}
            avatar
            type="update"
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles, {
  withTheme: true
})(Dashboard);
