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

import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import BuildIcon from '@material-ui/icons/Build';

import {
  Advisories,
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
  const [status, setStatus] = useState({
    type: 'init',
    options: {}
  });
  const [dialog, setDialog] = useState({
    open: false,
    error: false
  });
  const [metadataValues, setMetadata] = useState({
    dependencies: 0,
    devDependencies: 0,
    optionalDependencies: 0,
    vulnerabilities: null,
    advisories: null
  });
  const { content, error } = result || {};
  const defaultOptions = { text: iMessage('info', 'npmAuditInfo') };

  const auditRun = (option) => dispatch(
    runAudit({
      ipcEvent: 'npm-audit',
      cmd: ['audit'],
      options: {
        flag: option || false
      }
    })
  );

  const initOptions = {
    ...defaultOptions,
    detail: mode === 'global' ? iMessage('warning', 'noGlobalAudit') : null,
    actionText: iMessage('action', 'runAudit'),
    actionHandler: () => auditRun(),
    actionDisabled: mode === 'global'
  };

  const noIssuesOptions = {
    ...defaultOptions,
    text: iMessage('info', 'noAuditIssues'),
    actionText: iMessage('action', 'runAudit'),
    actionHandler: () => auditRun(),
  };

  // set data
  useEffect(() => {
    const { metadata, advisories } = content || {};

    if (!content && !loading) {
      setStatus({
        type: 'init',
        options: initOptions
      })

      return;
    }

    if (!metadata && !advisories) {
      setStatus({
        type: 'dialog'
      })

      return;
    }

    const {
      dependencies,
      devDependencies,
      optionalDependencies,
      vulnerabilities
    } = metadata;

    setMetadata({
      dependencies,
      devDependencies,
      optionalDependencies,
      vulnerabilities,
      advisories
    })

    setStatus({
      type: 'audit'
    })
  }, [content]);

  // set error
  useEffect(() => {
    if (error) {
      const { summary, code } = error || {};

      const errorOptions = {
        ...options,
        text: summary,
        code
      };

      setStatus({
        type: 'error',
        options: errorOptions
      })
    }
  }, [error]);

  const { type, options } = status;
  const { dependencies, devDependencies, optionalDependencies, vulnerabilities, advisories } = metadataValues || {}

  return (
    <>
      <AppLoader loading={loading} message={message}>
        <div className={classes.root}>
          {type === 'error' && <HelperText {...options} />}
          {type === 'init' && <HelperText {...options} />}
          {type === 'audit' && <>
            <Grid container spacing={8} className={classes.gridContainer}>
              <Grid item lg={4} md={4} sm={12} xl={4}>
                <Hidden mdDown>
                  <StatsCard
                    title={iMessage('title', 'dependencies')}
                    value={dependencies}
                    color="primary"
                    icon={<ListIcon />}
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
                    icon={<BuildIcon />}
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
                    icon={<AddIcon />}
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
            <Advisories data={advisories} handleAudit={auditRun} vulnerabilities={vulnerabilities} />
          </>
          }
        </div>
      </AppLoader>
      <Dialog
        open={type === 'dialog'}
        onClose={() => setStatus({
          type: 'init',
          options: initOptions
        })}
        aria-labelledby="audit"
        fullWidth
      >
        <DialogContent>
          {error ? <HelperText {...dialog} /> : <Summary data={content} onClose={() => setStatus({
            type: 'init',
            options: initOptions
          })} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

Audit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles, { withTheme: false })(Audit);
