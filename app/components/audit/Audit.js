import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import BuildIcon from '@material-ui/icons/Build';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import { runAudit } from 'models/npm/actions';
import { iMessage } from 'commons/utils';
import { AppLoader, HelperText } from 'components/common';
import AuditReport from './AuditReport';
import AuditList from './AuditList';
import AuditSummary from './AuditSummary';
import styles from './styles/audit';

const mapState = ({
  common: { mode, directory },
  ui: {
    loaders: {
      auditLoader: { loading, message },
    },
  },
  npm: {
    audit: { result: auditResult, fix: auditFix },
  },
}) => ({
  loading,
  message,
  mode,
  directory,
  auditResult,
  auditFix,
});

const AuditStatus = ({ mode, handler, hideAction, text = '' }) => {
  const statusText =
    mode === 'global'
      ? iMessage('warning', 'noGlobalAudit')
      : iMessage('info', 'npmAuditInfo');

  return (
    <HelperText
      text={text || statusText}
      actionText={hideAction ? '' : iMessage('action', 'runAudit')}
      actionDisabled={Boolean(mode === 'global')}
      color="primary"
      actionHandler={() => (hideAction ? undefined : handler())}
    />
  );
};

AuditStatus.propTypes = {
  mode: PropTypes.string.isRequired,
  handler: PropTypes.func,
  text: PropTypes.string,
  hideAction: PropTypes.bool,
};

const Audit = ({ classes }) => {
  const dispatch = useDispatch();
  const { loading, message, mode, auditResult, auditFix } = useMappedState(
    mapState
  );

  const [status, setStatus] = useState('init');
  const [advisories, setAdvisories] = useState(null);
  const [metadata, setMetadata] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const auditRun = useCallback(
    (flag = false) =>
      dispatch(
        runAudit({
          ipcEvent: 'npm-audit',
          cmd: ['audit'],
          options: {
            flag,
          },
        })
      ),
    [dispatch]
  );

  useEffect(() => {
    const { error, content } = auditResult || {};

    if (error) {
      const { summary, code } = error || {};

      setStatus('error');
      setError(summary);

      return;
    }

    const { advisories, metadata, runId } = content || {};

    if (runId) {
      setStatus('audit');
      setAdvisories({
        ...advisories,
      });
      setMetadata({
        ...metadata,
      });

      return;
    }

    if (!auditResult) {
      return;
    }

    setStatus('result');
    setResult({
      ...auditResult.content,
    });
  }, [auditResult]);

  const noVulnerabilities =
    status === 'audit' &&
    metadata.vulnerabilities &&
    Object.values(metadata.vulnerabilities).reduce((total, v) => total + v, 0);

  return (
    <>
      <AppLoader loading={loading} message={message}>
        <div className={classes.root}>
          {status === 'result' && (
            <AuditSummary
              data={result}
              onClose={() => setStatus('init')}
              mode={mode}
            />
          )}
          {status === 'error' && (
            <AuditStatus text={error} mode={mode} hideAction={true} />
          )}
          {status === 'init' && <AuditStatus handler={auditRun} mode={mode} />}
          {status === 'audit' && (
            <>
              {noVulnerabilities > 0 ? (
                <AuditList
                  data={advisories}
                  handleAudit={auditRun}
                  vulnerabilities={metadata.vulnerabilities}
                />
              ) : (
                <HelperText detail={iMessage('info', 'noVulnerabilities')} />
              )}
            </>
          )}
        </div>
      </AppLoader>
    </>
  );
};

Audit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Audit);
