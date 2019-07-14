/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useState } from 'react'
import { withStyles } from '@material-ui/core';
import { groupBy } from 'ramda';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden'
import { lighten } from '@material-ui/core/styles/colorManipulator';

import { Dot } from 'components/common';
import { defaultFont, grayColor } from 'styles/variables';
import { AUDIT_TYPES } from 'constants/AppConstants'
import { iMessage, switchcase } from 'commons/utils'

import { Advisories, AdvisoryDetails, DependencyStat, ListTypes } from './components';

const Audit = ({ classes, data }) => {
  const [active, setActive] = useState(null)
  const { content, error } = data || {};

  const renderText = ({ summary, detail, isError }) => <div className={classes.containerColumn}>
    <Typography
      variant="subtitle1"
      className={cn(classes.noData, classes.withPadding)}
      color={isError ? 'error' : 'inherit'}
    >
      {summary}
    </Typography>
    {detail && <Typography variant="caption" className={cn(classes.helperText)}>
      {detail}
    </Typography>}
  </div>

  if (error) {
    return renderText(Object.assign({}, error, {
      isError: true
    }))
  }

  if (!content) {
    const options = {
      summary: iMessage('info', 'npmAuditInfo'),
      detail: iMessage('info', 'npmAuditHelperText')
    }

    return renderText(options)
  }

  const {
    metadata: {
      dependencies,
      devDependencies,
      optionalDependencies,
      totalDependencies,
      vulnerabilities
    },
    advisories,
  } = content || {};

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

  const totalIssues = typesData.reduce((acc, type) => acc + type.value, 0)

  const groupByTitle = groupBy((dataItem) => {
    const { title } = dataItem;
    const parsedTitle = title && title.trim();

    return switchcase({
      [AUDIT_TYPES.PP.trim()]: () => 'PP',
      [AUDIT_TYPES.AFO.trim()]: () => 'AFO',
      [AUDIT_TYPES.UAF.trim()]: () => 'UAF',
      [AUDIT_TYPES.CI.trim()]: () => 'CI',
      [AUDIT_TYPES.REDOS.trim()]: () => 'REDOS',
      [AUDIT_TYPES.DOS.trim()]: () => 'DOS',

    })('NA')(parsedTitle);
  });

  const types = groupByTitle(Object.values(advisories));
  console.log(active);
  
  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
            title={iMessage('title', 'total')}
            value={totalDependencies}
            color="warning"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
            percent={dependenciesPercentage.toFixed(2)}
            value={dependencies}
            color="secondary"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
            percent={devDependenciesPercentage.toFixed(2)}
            value={devDependencies}
            color="secondary"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xl={3}>
          <DependencyStat
            percent={optionalDependenciesPercentage.toFixed(2)}
            value={optionalDependencies}
            color="warning"
          />
        </Grid>
      </Grid>
      <Grid container spacing={0}>
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
              sm={active ? 8 : 10}
              md={active ? 8 : 10}
              lg={active ? 8 : 10}
              xl={active ? 8 : 10}>
              <Advisories data={advisories} handleClick={setActive} />
            </Grid>
            {active && <Grid item
              sm={active ? 4 : 2}
              md={active ? 4 : 2}
              lg={active ? 4 : 2}
              xl={active ? 4 : 2}>
              <AdvisoryDetails data={active} handleClose={() => setActive(null)} />
            </Grid>}
            {!active && totalIssues ? <Hidden mdDown><Grid item
              sm={active ? 4 : 2}
              md={active ? 4 : 2}
              lg={active ? 4 : 2}
              xl={active ? 4 : 2}>
              <ListTypes types={types} />
            </Grid></Hidden> : null}
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
    paddingBottom: theme.spacing.unit * 4,
  },
  containerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 2,
  },
  types: {
    width: '100%',
    display: 'flex'
  },
  typeItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing.unit
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
  noData: {
    ...defaultFont
  },
  withPadding: {
    padding: theme.spacing.unit + 4
  },
  helperText: {
    ...defaultFont,
    color: lighten(grayColor, 0.1),
    fontSize: 16
  },
});

export default withStyles(styles, { withTheme: true })(Audit);
