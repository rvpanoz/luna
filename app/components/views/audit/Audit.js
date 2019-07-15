/* eslint-disable react/prop-types */

import React from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { groupBy } from 'ramda';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { AUDIT_TYPES, AUDIT_ERRORS } from 'constants/AppConstants';
import { iMessage, switchcase } from 'commons/utils';

import {
  Advisories,
  AdvisoryDetails,
  OverviewCard,
  ListTypes,
  ListDotTypes
} from './components';

import styles from './styles/audit';

const HelperText = ({ classes, summary, detail, isError, code }) => {
  const auditErrors = Object.keys(AUDIT_ERRORS);
  const needAction = auditErrors.includes(code);

  return (
    <div className={classes.containerColumn}>
      <Typography
        variant="subtitle1"
        className={cn(classes.noData, classes.withPadding)}
        color={isError ? 'error' : 'inherit'}
      >
        {summary}
      </Typography>
      {detail && (
        <Fragment>
          <Typography variant="caption" className={classes.helperText}>
            {detail}
          </Typography>
          {needAction && (
            <Button
              color="primary"
              className={classes.buttonFix}
              variant="outlined"
            >
              Fix
            </Button>
          )}
        </Fragment>
      )}
    </div>
  );
};

HelperText.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  summary: PropTypes.string,
  detail: PropTypes.string,
  isError: PropTypes.bool,
  code: PropTypes.string
};

const WithStylesHelperText = withStyles(styles)(HelperText);

const Audit = ({ classes, data, theme }) => {
  const [active, setActive] = useState(null);
  const { content, error } = data || {};

  if (error) {
    const props = Object.assign({}, error, {
      isError: true
    });

    return <WithStylesHelperText {...props} />;
  }

  if (!content) {
    const options = {
      summary: iMessage('info', 'npmAuditInfo'),
      detail: iMessage('info', 'npmAuditHelperText'),
      code: null,
      isError: false
    };

    return <WithStylesHelperText {...options} />;
  }

  const {
    metadata: {
      dependencies,
      devDependencies,
      optionalDependencies,
      vulnerabilities
    },
    advisories
  } = content || {};

  const { info, high, critical, moderate, low } = vulnerabilities;
  const overviewData = { dependencies, devDependencies, optionalDependencies };
  const typesData = [
    {
      value: critical,
      name: 'Critical',
      fill: theme.palette.error.main
    },
    {
      value: high,
      name: 'High',
      fill: theme.palette.warning.main
    },
    {
      value: moderate,
      name: 'Moderate',
      fill: theme.palette.secondary.main
    },
    {
      value: low,
      name: 'Low',
      fill: theme.palette.primary.main
    },
    {
      value: info,
      name: 'Info',
      fill: theme.palette.info.main
    }
  ];

  const totalIssues = typesData.reduce((acc, type) => acc + type.value, 0);

  const groupByTitle = groupBy(dataItem => {
    const { title } = dataItem;
    const newTitle = title && title.trim();

    return switchcase({
      [AUDIT_TYPES.PP.trim()]: () => 'PP',
      [AUDIT_TYPES.AFO.trim()]: () => 'AFO',
      [AUDIT_TYPES.UAF.trim()]: () => 'UAF',
      [AUDIT_TYPES.CI.trim()]: () => 'CI',
      [AUDIT_TYPES.REDOS.trim()]: () => 'REDOS',
      [AUDIT_TYPES.DOS.trim()]: () => 'DOS',
      [AUDIT_TYPES.RMD.trim()]: () => 'RMD',
      [AUDIT_TYPES.DOSWS.trim()]: () => 'DOSWS',
      [AUDIT_TYPES.CINJ.trim()]: () => 'CINJ',
      [AUDIT_TYPES.CRWP.trim()]: () => 'CRWP',
      [AUDIT_TYPES.OFBR.trim()]: () => 'OFBR',
      [AUDIT_TYPES.MEXP.trim()]: () => 'MEXP',
      [AUDIT_TYPES.ORED.trim()]: () => 'ORED',
      [AUDIT_TYPES.INENT.trim()]: () => 'INENT',
      [AUDIT_TYPES.MOV.trim()]: () => 'MOV',
      [AUDIT_TYPES.RCEXC.trim()]: () => 'RCEXC',
      [AUDIT_TYPES.CSS.trim()]: () => 'CSS'
    })('NA')(newTitle);
  });

  const types = groupByTitle(Object.values(advisories));

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item lg={12} md={12} sm={12} xl={12}>
          <OverviewCard
            title={iMessage('title', 'overview')}
            values={overviewData}
          />
        </Grid>
      </Grid>
      <Grid container spacing={8} className={classes.gridContainer}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <ListDotTypes types={typesData} />
        </Grid>
      </Grid>
      <Grid container spacing={8} className={classes.gridContainer}>
        <Grid item sm={8} md={8} lg={8} xl={8} className={classes.transition}>
          <Advisories data={advisories} handleClick={setActive} />
        </Grid>
        {active && (
          <Grid item sm={4} md={4} lg={4} xl={4}>
            <AdvisoryDetails
              data={active}
              handleClose={() => setActive(null)}
            />
          </Grid>
        )}
        {!active && totalIssues ? (
          <Grid item sm={4} md={4} lg={4} xl={4}>
            <ListTypes types={types} />
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

Audit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  theme: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
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
