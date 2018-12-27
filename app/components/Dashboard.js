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
    projectVersion
  } = useMappedState(mapState);

  const renderItems = () => (
    <div className={classes.flexContainer}>
      <div className={classes.flexContainerItem}>Manager:&nbsp;{manager}</div>
      <div className={cn(classes.flexContainerItem, classes.textRight)}>
        Problems:&nbsp;21
      </div>
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
            title={`${
              mode === APP_MODES.LOCAL && projectName
                ? `${projectName} v${projectVersion}`
                : 'Project'
            }`}
            description={packages ? packages.length : 0}
            subtext={directory || 'No working directory'}
            text={renderItems()}
            loading={loading}
            avatar
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            title="Total dependencies"
            description={packages ? packages.length : 0}
            color="red"
            text={'Last update at'}
            loading={loading}
            avatar
            type="update"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            title="Outdated packages"
            description={packagesOutdated ? packagesOutdated.length : 0}
            color="blue"
            text="Updated"
            loading={loading}
            link={{
              text: 'View packages',
              href: '#'
            }}
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
