// dev
import DATA from '../../../npm-audit.json';

import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/audit';
import { Grid, withStyles, Divider, Typography } from '@material-ui/core';
import { Dot } from 'components/common';
import { DependencyStat } from './components';

const Audit = ({ classes, theme, data }) => {
  console.log(DATA);
  const {
    content: {
      metadata: {
        dependencies,
        devDependencies,
        optionalDependencies,
        totalDependencies,
        vulnerabilities
      },
      advisories,
      actions
    },
    error
  } = DATA || {};

  if (error) {
    console.error(error);
    return null;
  }

  const { info, high, critical, moderate, low } = vulnerabilities;
  const dependenciesPercentage = (dependencies / totalDependencies) * 100;
  const devDependenciesPercentage = (devDependencies / totalDependencies) * 100;
  const optionalDependenciesPercentage =
    (optionalDependencies / totalDependencies) * 100;

  const totalAdvisories = Object.values(advisories).length;
  const totalActions = Object.values(actions).length;

  const vulnerabilitiesData = [
    {
      name: 'Critical',
      color: 'error',
      value: critical,
      fill: theme.palette.error.main
    },
    {
      name: 'Moderate',
      color: 'secondary',
      value: moderate,
      fill: theme.palette.primary.main
    },
    {
      name: 'Info',
      color: 'primary',
      value: info,
      fill: theme.palette.secondary.main
    },
    {
      name: 'High',
      color: 'warning',
      value: high,
      fill: theme.palette.warning.main
    },
    { name: 'Low', color: 'primary', value: low, fill: theme.palette.info.main }
  ];

  const legendStyle = {
    lineHeight: '24px',
    left: 0
  };

  const totalVulnerabilities = vulnerabilitiesData.reduce(
    (total, { value }) => total + value,
    0
  );

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
            title="Dependencies"
            percent={dependenciesPercentage.toFixed(2)}
            value={dependencies}
            color="primary"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
            title="Development"
            percent={devDependenciesPercentage.toFixed(2)}
            value={devDependencies}
            color="secondary"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
            title="Optional"
            percent={optionalDependenciesPercentage.toFixed(2)}
            value={optionalDependencies}
            color="warning"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
            title="Total"
            value={totalDependencies}
            color="warning"
          />
        </Grid>
      </Grid>
      <Grid container alignContent="center">
        <Grid item xs={12}>
          <div className={classes.container}>
            <div className={classes.types}>
              {typesData.map(({ value, label, color }) => (
                <div key={label} className={classes.typeItem}>
                  <Dot size="large" color={color} />
                  <Typography
                    color="textSecondary"
                    className={classes.typeItemText}
                  >
                    {label}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
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

export default withStyles(styles, { withTheme: true })(Audit);
