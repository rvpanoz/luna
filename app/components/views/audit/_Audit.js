import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import { iMessage } from 'commons/utils';

import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis
} from "recharts";

import Widget from 'components/common/Widget';
import Dot from 'components/common/Dot';

import styles from './styles/audit';

const getRandomData = (length, min, max, multiplier = 10, maxDiff = 10) => {
  const array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
};

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

const Audit = ({ classes, data, theme }) => {
  if (!data) {
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

  const { error } = data;

  if (error) {
    const { code, summary, detail } = data;

    return renderError(classes, code, summary, detail);
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
    }
  } = data;

  const dependenciesPercentage = (dependencies / totalDependencies) * 100;
  const devDependenciesPercentage = (devDependencies / totalDependencies) * 100;
  const optionalDependenciesPercentage =
    (optionalDependencies / totalDependencies) * 100;

  const totalVulnerabilities = Object.values(vulnerabilities).reduce((acc, item) => {
    return acc + item
  }, 0);

  const { info, critical, high, moderate } = vulnerabilities;

  const pieChartData = [
    { name: "Info", value: info, color: "primary" },
    { name: "High", value: high, color: "secondary" },
    { name: "Moderate", value: moderate, color: "warning" },
    { name: "Critical", value: critical, color: "error" }
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
          <Grid container spacing={8}>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Widget
                title={iMessage('title', 'overview')}
                upperTitle
                bodyClass={classes.fullHeightBody}
                className={classes.card}
              >
                <Divider light />
                <Grid container direction="column">
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography variant="h6" color="textSecondary">
                          {iMessage('label', 'dependencies')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" color="textSecondary">
                          {dependencies} ({dependenciesPercentage.toFixed(2)}%)
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography variant="h6" color="textSecondary">
                          {iMessage('label', 'devDependencies')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" color="textSecondary">
                          {devDependencies} ({devDependenciesPercentage.toFixed(2)}%)
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography variant="subtitle1" color="textSecondary">
                          {iMessage('label', 'optionalDependencies')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {optionalDependencies} ({optionalDependenciesPercentage.toFixed(2)}%)
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart
                        margin={{ left: theme.spacing.unit * 2 }}
                      >
                        <Pie
                          data={pieChartData}
                          innerRadius={45}
                          outerRadius={60}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={theme.palette[entry.color].main}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Grid>
                </Grid>
              </Widget>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Widget
                title={iMessage('title', 'vulnerabilities')}
                upperTitle
                bodyClass={classes.fullHeightBody}
                className={classes.card}
              >
                <div className={classes.overviewContainer}>
                  <Typography variant="h6">
                    {iMessage('label', 'total')}: {totalVulnerabilities}
                  </Typography>
                </div>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">{iMessage('label', 'critical')}</Typography>
                    <Typography variant="body1">{vulnerabilities.critical}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">{iMessage('label', 'low')}</Typography>
                    <Typography variant="body1">{vulnerabilities.low}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">{iMessage('label', 'moderate')}</Typography>
                    <Typography variant="body1">{vulnerabilities.moderate}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">{iMessage('label', 'high')}</Typography>
                    <Typography variant="body1">{vulnerabilities.high}</Typography>
                  </Grid>
                </Grid>
              </Widget>
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Widget title="Revenue Breakdown" upperTitle className={classes.card}>
                <Grid container spacing={8}>
                  <Grid item xs={6}>
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart
                        margin={{ left: theme.spacing.unit * 2 }}
                      >
                        <Pie
                          data={pieChartData}
                          innerRadius={45}
                          outerRadius={60}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={theme.palette[entry.color].main}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <div className={classes.elementChartWrapper}>
                      {/* <ResponsiveContainer width="100%" height={150}>
                        {pieChartData.map(({ name, value, color }, index) => (
                          <div key={color} className={classes.legendItemContainer}>
                            <Dot color={color} />
                            <Typography style={{ whiteSpace: 'nowrap' }}>&nbsp;{name}&nbsp;</Typography>
                            <Typography color="textSecondary">
                              &nbsp;{value}
                            </Typography>
                          </div>
                        ))}
                      </ResponsiveContainer> */}
                    </div>
                  </Grid>
                </Grid>
              </Widget>
            </Grid>
          </Grid>
        </div>
      </div>
    </Paper>
  );
};

Audit.defaultProps = {
  data: null
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
  ),
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles, {
  withTheme: true
})(Audit);
