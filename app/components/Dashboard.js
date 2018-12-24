/* eslint-disable */

/**
 * Dashboard
 */

import React from 'react';
import { objectOf, object } from 'prop-types';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import CardInfo from './layout/CardInfo';

const styles = () => ({
  root: {
    padding: 0,
    margin: 0
  }
});

const Dashboard = props => {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            title="Used Space"
            description="49/50"
            small="GB"
            icon="info"
            iconscolor="info"
            text="Get More Space..."
            renderAvatarIcon={() => <WarningIcon />}
            renderActionsIcon={() => <InfoIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo
            title="Dependencies"
            description="49/50"
            small="GB"
            icon="warning"
            iconscolor="danger"
            text="Get More Space..."
            renderAvatarIcon={() => <WarningIcon />}
            renderActionsIcon={() => <InfoIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} />
      </Grid>
    </section>
  );
};

Dashboard.propTypes = {
  classes: objectOf(object).isRequired
};

export default withStyles(styles)(Dashboard);
