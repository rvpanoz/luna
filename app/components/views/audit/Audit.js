// dev
import DATA from '../../../npm-audit.json';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles/audit';

import Typography from '@material-ui/core/Typography';
import Dot from 'components/common/Dot';
import { Grid, withStyles, Divider } from '@material-ui/core';
import { iMessage } from 'commons/utils';
import { StatsWidget } from './components';

const Audit = ({ classes, theme, data }) => {
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
  } = DATA;

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

  const statsListData = [
    { value: critical, label: 'critical', secondary: true, color: 'error' },
    { value: high, label: 'high', secondary: true, color: 'error' },
    { value: moderate, label: 'moderate', secondary: true, color: 'error' },
    { value: low, label: 'low', secondary: true, color: 'error' },
    { value: info, label: 'info', secondary: true, color: 'error' }
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <StatsWidget
            title="Dependencies"
            percent={dependenciesPercentage.toFixed(2)}
            value={dependencies}
            color="secondary"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}></Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}></Grid>
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
