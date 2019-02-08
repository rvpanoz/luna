/* eslint-disable */

import { APP_MODES, APP_INFO } from 'constants/AppConstants';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useMappedState } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import CardInfo from './layout/CardInfo';
import CardDetails from './layout/CardDetails';
import Transition from './layout/Transition';
import AppLoader from './layout/AppLoader';

import styles from './styles/dashboard';

import WarningIcon from '@material-ui/icons/WarningOutlined';
import UpdateIcon from '@material-ui/icons/UpdateOutlined';
import BalotIcon from '@material-ui/icons/BallotOutlined';
import BarChartIcon from '@material-ui/icons/BarChartOutlined';

import { BasicCard, DetailsCard } from 'components/atoms/';
import { Typography } from '@material-ui/core';

const mapState = ({
  common: {
    manager,
    mode,
    directory,
    loader: { loading }
  },
  packages: {
    lastUpdatedAt,
    packages,
    packagesOutdated,
    projectName,
    projectVersion,
    projectDescription,
    projectLicense,
    projectAuthor
  }
}) => ({
  manager,
  mode,
  directory,
  loading,
  lastUpdatedAt,
  packages,
  packagesOutdated,
  projectName,
  projectVersion,
  projectDescription,
  projectLicense,
  projectAuthor
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
    projectDescription,
    projectLicense,
    projectAuthor,
    lastUpdatedAt
  } = useMappedState(mapState);

  return (
    <section className={classes.root}>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <DetailsCard
            mode={mode}
            directory={directory}
            name={projectName}
            version={projectVersion}
            description={projectDescription}
            license={projectLicense}
            author={projectAuthor}
            lastUpdatedAt={lastUpdatedAt}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <BasicCard renderIcon={() => console.log('todo')} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <BasicCard renderIcon={() => console.log('todo')} />
        </Grid>
      </Grid>
    </section>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Dashboard);
