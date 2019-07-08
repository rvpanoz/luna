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
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import {
  DependenciesStats,
  DependenciesPieChart,
  VulnerabilitiesStats,
  VulnerabilitiesBarChart
} from './components/';

import styles from './styles/audit';

const lineData = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

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
    { name: 'Info', vulnerabilities: info, color: 'info' },
    { name: 'High', vulnerabilities: high, color: 'warning' },
    { name: 'Moderate', vulnerabilities: moderate, color: 'secondary' },
    { name: 'Critical', vulnerabilities: critical, color: 'error' },
    { name: 'Low', vulnerabilities: low, color: 'primary' }
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
            <Grid item sm={12} md={6} lg={6} xl={6}>
              <Widget
                title="Overview"
                upperTitle
                bodyClass={classes.fullHeightBody}
                className={classes.card}
              >
                <Divider light />
                <div>
                  <LineChart
                    width={500}
                    height={300}
                    data={lineData}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" strokeOpacity={1} stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" strokeOpacity={1} stroke="#82ca9d" />
                  </LineChart>
                  <p className="notes">Tips: Hover the legend !</p>
                </div>
                {/* <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="h6" color="textSecondary">Dependencies</Typography>
                    <Typography variant="h5">{dependencies}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" color="textSecondary">Development</Typography>
                    <Typography variant="h5">{devDependencies}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" color="textSecondary">Optional</Typography>
                    <Typography variant="h5">{optionalDependencies}</Typography>
                  </Grid>
                </Grid> */}
              </Widget>
            </Grid>
            <Grid item sm={12} md={6} lg={6} xl={6}>
              <Widget
                title={iMessage('title', 'vulnerabilities')}
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
