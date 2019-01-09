/**
 * Dashboard component
 */

import { APP_MODES, APP_INFO } from 'constants/AppConstants';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useMappedState } from 'redux-react-hook';
import { withStyles, Toolbar } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ViewCompactIcon from '@material-ui/icons/ViewCompactOutlined';
import HistoryIcon from '@material-ui/icons/HistoryOutlined';

import CardInfo from './layout/CardInfo';
import CardDetails from './layout/CardDetails';
import styles from './styles/dashboard';

const mapState = ({
  common: { notifications, manager, mode, directory },
  packages: {
    loading,
    lastUpdatedAt,
    packages,
    packagesOutdated,
    projectName,
    projectVersion
  }
}) => ({
  notifications,
  manager,
  mode,
  directory,
  loading,
  lastUpdatedAt,
  packages,
  packagesOutdated,
  projectName,
  projectVersion
});

const Dashboard = props => {
  const { classes } = props;

  const {
    packages,
    packagesOutdated,
    loading,
    directory,
    mode,
    projectName,
    projectVersion,
    lastUpdatedAt,
    notifications
  } = useMappedState(mapState);

  const renderProjectStats = () => (
    <div className={classes.flexContainer}>
      <div className={classes.flexContainerItem}>
        version:&nbsp;
        {loading ? (
          <span className="loading-dots" />
        ) : (
          projectVersion || APP_INFO.NOT_AVAILABLE
        )}
      </div>
      <div className={cn(classes.flexContainerItem, classes.textRight)}>
        Problems:&nbsp;{notifications ? notifications.length : 0}
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
      <div className={cn(classes.flexContainerItem, classes.textRight)}>
        <a href="#" className={classes.cardLink}>
          View details
        </a>
      </div>
    </div>
  );

  return (
    <section className={classes.root}>
      <Grid container justify="flex-end">
        <Toolbar>
          <Tooltip title="Compact layout">
            <IconButton onClick={e => console.log(e)}>
              <ViewCompactIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Preview history">
            <IconButton onClick={e => console.log(e)}>
              <HistoryIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Grid>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
          <CardDetails
            id="card-1"
            title={
              mode === APP_MODES.LOCAL && projectName ? projectName : 'Project'
            }
            subtext={directory || APP_INFO.NO_WORKING_DIRECTORY}
            text={renderProjectStats()}
            loading={loading}
            avatar
            className={classes.cardDetails}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <CardInfo
            id="card-2"
            title="Total dependencies"
            description={packages ? packages.length : 0}
            color="danger"
            text={renderDependenciesStats()}
            loading={loading}
            type="update"
            className={classes.cardInfo}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <CardInfo
            id="card-3"
            title="Outdated packages"
            description={packagesOutdated ? packagesOutdated.length : 0}
            color="info"
            text={renderStats()}
            type="stats"
            className={classes.cardInfo}
          />
        </Grid>
      </Grid>
    </section>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Dashboard);
