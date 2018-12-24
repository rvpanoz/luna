/**
 * Dashboard
 */

import React from 'react';
import { objectOf, object } from 'prop-types';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import WarningIcon from '@material-ui/icons/Warning';
import WarningIcon1 from '@material-ui/icons/Cached';

import Card from './layout/Card';

const styles = () => ({
  root: {
    padding: 0,
    margin: 0
  }
});

// TODO: implement InfoCard

const Dashboard = props => {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Grid container justify="space-around">
        <Grid item xs={12} sm={6} md={3}>
          <Card
            icon={WarningIcon1}
            iconColor="orange"
            title="Used Space"
            description="49/50"
            small="GB"
            statIcon={WarningIcon}
            statIconColor="danger"
            statLink={{ text: 'Get More Space...', href: '#pablo' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            icon={WarningIcon1}
            iconColor="orange"
            title="Used Space"
            description="49/50"
            small="GB"
            statIcon={WarningIcon}
            statIconColor="danger"
            statLink={{ text: 'Get More Space...', href: '#pablo' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            icon={WarningIcon1}
            iconColor="orange"
            title="Used Space"
            description="49/50"
            small="GB"
            statIcon={WarningIcon}
            statIconColor="danger"
            statLink={{ text: 'Get More Space...', href: '#pablo' }}
          />
        </Grid>
      </Grid>
    </section>
  );
};

Dashboard.propTypes = {
  classes: objectOf(object).isRequired
};

export default withStyles(styles)(Dashboard);
