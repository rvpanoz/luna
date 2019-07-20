/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import { runAudit } from 'models/npm/actions';
import { iMessage } from 'commons/utils';
import { AppLoader, HelperText } from 'components/common';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import {
  Actions,
  Advisories,
  AdvisoryDetails,
  ListDotTypes,
  Summary,
  StatsCard
} from 'components/views/audit/components';

import styles from './styles/audit';

const mapState = ({
  common: { mode, directory },
  ui: {
    loaders: {
      auditLoader: { loading, message }
    }
  },
  npm: {
    audit: { result, fix }
  }
}) => ({
  loading,
  message,
  mode,
  directory,
  result,
  fix
});

const Audit = ({ classes }) => {
  const dispatch = useDispatch();
  const { loading, message, mode, result, fix } = useMappedState(mapState);
  const [errorDetails, setError] = useState(null);
  const [active, setActive] = useState(null);
  const [reportType, setReportType] = useState('report')
  const { content, error } = result || {};
  const options = { text: iMessage('info', 'npmAuditInfo') };

  const auditRun = () => dispatch(
    runAudit({
      ipcEvent: 'npm-audit',
      cmd: ['audit']
    })
  );

  // set error
  useEffect(() => {
    if (error) {
      const { detail, code } = error || {};

      const errorOptions = {
        ...options,
        text: detail,
        code
      };

      setError(errorOptions);
    }
  }, [error]);

  // set report type
  useEffect(() => {
    const type = fix ? 'summary' : 'report'

    setReportType(type)
  }, [fix]);


  if (!content && !loading) {
    const contentOptions = {
      ...options,
      detail: mode === 'global' ? iMessage('warning', 'noGlobalAudit') : null,
      actionText: iMessage('action', 'runAudit'),
      actionHandler: auditRun,
      actionDisabled: mode === 'global'
    };

    return <HelperText {...contentOptions} />;
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
  } = content || { metadata: {}, actions: [], advisories: {} };
  const advisoriesValues = Object.values(advisories);

  return (
    <>
      <AppLoader loading={loading} message={message}>
        <div className={classes.root}>
          <Grid container spacing={8} className={classes.gridContainer}>
            <Grid item lg={4} md={4} sm={12} xl={4}>
              <Hidden mdDown>
                <StatsCard
                  title={iMessage('title', 'dependencies')}
                  value={dependencies}
                  color="primary"
                />
              </Hidden>
              <Hidden smUp>
                <Typography variant="h6" color="textSecondary">
                  {iMessage('title', 'dependencies')}&nbsp;{dependencies}
                </Typography>
              </Hidden>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xl={4}>
              <Hidden mdDown>
                <StatsCard
                  title={iMessage('title', 'devDependencies')}
                  value={devDependencies}
                  color="danger"
                />
              </Hidden>
              <Hidden smUp>
                <Typography variant="h6" color="textSecondary">
                  {iMessage('title', 'devDependencies')}&nbsp;{devDependencies}
                </Typography>
              </Hidden>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xl={4}>
              <Hidden mdDown>
                <StatsCard
                  title={iMessage('title', 'optionalDependencies')}
                  value={optionalDependencies}
                  color="warning"
                />
              </Hidden>
              <Hidden smUp>
                <Typography variant="h6" color="textSecondary">
                  {iMessage('title', 'optionalDependencies')}&nbsp;
                  {optionalDependencies}
                </Typography>
              </Hidden>
            </Grid>
          </Grid>
          {reportType === 'report' && <Advisories data={advisories} handleAudit={auditRun} vulnerabilities={vulnerabilities} />}
          {reportType === 'summary' && <Summary />}
        </div>
      </AppLoader>
      <Dialog
        open={Boolean(error)}
        onClose={() => { }}
        aria-labelledby="audit-error"
      >
        <DialogContent>
          <HelperText {...error} />
        </DialogContent>
      </Dialog>
    </>
  );
};

Audit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles, { withTheme: false })(Audit);
