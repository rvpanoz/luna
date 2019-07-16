/* eslint-disable */
/* eslint-disable react/prop-types */

import React from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useState } from 'react';
import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

import { AUDIT_ERRORS } from 'constants/AppConstants';
import { iMessage } from 'commons/utils';

// mock data
// import DATA from './npm-audit.json';

import {
  Actions,
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

const Audit = ({ classes, data }) => {
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
    actions,
    advisories
  } = content || {};

  const overviewData = { dependencies, devDependencies, optionalDependencies };

  return (
    <div className={classes.root}>
      <Hidden mdDown>
        <Grid container spacing={8} className={classes.gridContainer}>
          <Grid item lg={6} md={6} sm={12} xl={6}>
            <OverviewCard
              title={iMessage('title', 'overview')}
              data={overviewData}
            />
          </Grid>
          <Grid item xs={6} sm={12} md={6} lg={6} xl={6}>
            <ListDotTypes data={vulnerabilities} />
          </Grid>
        </Grid>
      </Hidden>
      <Grid container spacing={8} className={classes.gridContainer}>
        <Grid item sm={12} md={9} lg={9} xl={9} className={classes.transition}>
          <Advisories data={advisories} handleClick={setActive} />
        </Grid>
        {active && (
          <Grid item sm={12} md={3} lg={3} xl={3}>
            <AdvisoryDetails
              data={active}
              handleClose={() => setActive(null)}
            />
          </Grid>
        )}
        {!active ? (
          <Grid item sm={12} md={3} lg={3} xl={3}>
            <Actions data={actions} />
          </Grid>
        ) : null}
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

export default withStyles(styles, { withTheme: false })(Audit);
