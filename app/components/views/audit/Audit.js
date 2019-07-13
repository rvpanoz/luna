import React from 'react';
import { useState } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Dot } from 'components/common';
import { defaultFont } from 'styles/variables';

import { iMessage } from 'commons/utils'
import { Advisories, AdvisoryDetails, DependencyStat } from './components';

// dev
// import DATA from '../../../npm-audit.json';

const Audit = ({ classes, data }) => {
  const [active, setActive] = useState(null)
  console.log(active)
  if (!data) {
    return null
  }

  const {
    content: {
      metadata: {
        dependencies,
        devDependencies,
        optionalDependencies,
        totalDependencies,
        vulnerabilities
      },
      advisories
    },
    error
  } = data || {};

  if (error) {
    console.error(error);
    return null;
  }

  const { info, high, critical, moderate, low } = vulnerabilities;
  const dependenciesPercentage = (dependencies / totalDependencies) * 100;
  const devDependenciesPercentage = (devDependencies / totalDependencies) * 100;
  const optionalDependenciesPercentage =
    (optionalDependencies / totalDependencies) * 100;

  const typesData = [
    { value: critical, label: 'Critical', secondary: true, color: 'error' },
    { value: high, label: 'High', secondary: true, color: 'warning' },
    { value: moderate, label: 'Moderate', secondary: true, color: 'secondary' },
    { value: low, label: 'Low', secondary: true, color: 'primary' },
    { value: info, label: 'Info', secondary: true, color: 'default' }
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
            title={iMessage('title', 'overview')}
            value={totalDependencies}
            color="warning"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
            title="dependencies"
            percent={dependenciesPercentage.toFixed(2)}
            value={dependencies}
            color="secondary"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
          title="development"
            percent={devDependenciesPercentage.toFixed(2)}
            value={devDependencies}
            color="secondary"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
            title="optional"
            percent={optionalDependenciesPercentage.toFixed(2)}
            value={optionalDependencies}
            color="warning"
          />
        </Grid>
      </Grid>
      <Grid container spacing={32} alignContent="center">
        <Grid item xs={6}>
          <div className={classes.container}>
            <div className={classes.types}>
              {typesData.map(({ value, label, color }) => (
                <div key={label} className={classes.typeItem}>
                  <Dot size="large" color={color} />
                  <Typography
                    color="textSecondary"
                    className={classes.typeItemText}
                  >
                    {label}&nbsp;({value})
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.transition}>
          <Grid container spacing={8}>
            <Grid item
              sm={active ? 8 : 12}
              md={active ? 8 : 12}
              lg={active ? 8 : 12}
              xl={active ? 8 : 12}>
              <Advisories data={advisories} handleClick={setActive} />
            </Grid>
            {active && <Grid item
              sm={active ? 4 : 1}
              md={active ? 4 : 1}
              lg={active ? 4 : 1}
              xl={active ? 4 : 1}>
              <AdvisoryDetails data={active} handleClose={() => setActive(null)} />
            </Grid>}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
};

Audit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
      PropTypes.string
    ])
  )
};

const styles = theme => ({
  root: {
    width: '100%'
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 4,
  },
  types: {
    width: '100%',
    display: 'flex'
  },
  typeItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing.unit * 3
  },
  typeItemText: {
    ...defaultFont,
    fontSize: '18px !important',
    marginLeft: theme.spacing.unit
  },
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest
    })
  },
});

export default withStyles(styles, { withTheme: true })(Audit);
