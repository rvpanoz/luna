import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import { iMessage, switchcase } from 'commons/utils';

// dev
import DATA from '../../../npm-audit.json';

import Widget from 'components/common/Widget';
import Dot from 'components/common/Dot';

import {
  DependenciesStats,
  DependenciesPieChart,
  VulnerabilitiesStats,
  VulnerabilitiesBarChart
} from './components/';

import styles from './styles/audit';

const renderError = (classes, code, summary) => (
  <div className={classes.container}>
    <div className={classes.flexContainer}>
      <div className={classes.header}>
        <Typography className={classes.title}>{code}</Typography>
        <Divider className={classes.divider} light />
        <Typography variant="subtitle1">{summary}</Typography>
      </div>
    </div>
  </div>
);

const AuditReport = ({ classes, data, theme }) => {
  if (!DATA) {
    return (
      <div className={classes.containerHolder}>
        <Typography
          variant="subtitle1"
          className={cn(classes.noData, classes.withPadding)}
        >
          {iMessage('info', 'noAuditData')}
        </Typography>
        <Typography variant="caption" className={cn(classes.helperText)}>
          {iMessage('info', 'npmAuditHelperText')}
        </Typography>
      </div>
    );
  }

  const { error } = DATA;

  if (error) {
    const { code, summary, detail } = DATA;

    return renderError(classes, code, summary, detail);
  }

  const {
    metadata: {
      dependencies,
      devDependencies,
      optionalDependencies,
      totalDependencies,
      vulnerabilities
    },
    advisories
  } = DATA;

  const dependenciesPercentage = (dependencies / totalDependencies) * 100;
  const devDependenciesPercentage = (devDependencies / totalDependencies) * 100;
  const optionalDependenciesPercentage =
    (optionalDependencies / totalDependencies) * 100;

  const totalVulnerabilities = Object.values(vulnerabilities).reduce(
    (acc, item) => {
      return acc + item;
    },
    0
  );

  const { info, critical, high, moderate, low } = vulnerabilities;

  const pieChartDependenciesData = [
    {
      name: 'Dependencies',
      value: dependencies,
      color: 'primary',
      percentage: dependenciesPercentage
    },
    {
      name: 'Dev',
      value: devDependencies,
      color: 'secondary',
      percentage: devDependenciesPercentage
    },
    {
      name: 'Optional',
      value: optionalDependencies,
      color: 'warning',
      percentage: optionalDependenciesPercentage
    }
  ];

  const pieChartVulnerabilitiesData = [
    { name: 'Info', value: info, color: 'info' },
    { name: 'High', value: high, color: 'warning' },
    { name: 'Moderate', value: moderate, color: 'secondary' },
    { name: 'Critical', value: critical, color: 'error' },
    { name: 'Low', value: low, color: 'primary' }
  ];

  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <div className={classes.flexContainer}>
          <div className={classes.header}>
            <Typography variant="h6" className={classes.title}>
              {iMessage('title', 'audit')}
            </Typography>
          </div>
        </div>
        <Divider light />
        <div className={classes.topSection}>
          <Grid container direction="row" spacing={8} justify="space-between">
            <Grid item sm={12} md={6} lg={6} xl={4}>
              <Widget
                title={`Total dependencies: ${totalDependencies}`}
                upperTitle
                className={classes.card}
              >
                <Divider light />
                <Grid
                  container
                  spacing={8}
                  direction="row"
                  justify="space-around"
                >
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <DependenciesPieChart data={pieChartDependenciesData} />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <DependenciesStats data={pieChartDependenciesData} />
                  </Grid>
                </Grid>
              </Widget>
            </Grid>
            <Grid item sm={12} md={6} lg={6} xl={4}>
              <Widget
                title={`Vulnerabilities: ${totalVulnerabilities}`}
                upperTitle
                className={classes.card}
              >
                <Divider light />
                <Grid
                  container
                  spacing={8}
                  direction="column"
                  justify="space-around"
                >
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <VulnerabilitiesBarChart
                      data={pieChartVulnerabilitiesData}
                    />
                  </Grid>
                </Grid>
              </Widget>
            </Grid>
          </Grid>
          <div style={{ height: '50px' }} />
        </div>
      </div>
    </Paper>
  );
};

AuditReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
      PropTypes.string
    ])
  ),
  theme: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles, {
  withTheme: true
})(AuditReport);
