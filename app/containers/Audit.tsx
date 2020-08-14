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
import DialogContent from '@material-ui/core/DialogContent';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import BuildIcon from '@material-ui/icons/Build';
import { Advisories, StatsCard } from 'components/views/audit/components';
import styles from './styles/audit';

const mapState = ({
  common: { mode, directory },
  ui: {
    loaders: {
      auditLoader: { loading, message }
    }
  },
  npm: {
    audit: { result }
  }
}) => ({
  loading,
  message,
  mode,
  directory,
  result
});

const Audit = ({ classes }) => {
  const { loading, message, mode, result } = useMappedState(mapState);
  const [metadataValues, setMetadata] = useState({
    dependencies: 0,
    devDependencies: 0,
    optionalDependencies: 0,
    vulnerabilities: null,
    advisories: null
  });
  const dispatch = useDispatch();
  const { content, error } = result || {};

  const auditRun = option =>
    dispatch(
      runAudit({
        ipcEvent: 'npm-audit',
        cmd: ['audit'],
        options: {
          flag: option || false
        }
      })
    );

  const dialogText = mode === 'global' ? iMessage('warning', 'noGlobalAudit') : iMessage('info', 'npmAuditInfo');
  const dialogActionText = iMessage('action', 'runAudit');

  const initOptions = {
    text: dialogText,
    actionText: dialogActionText,
    actionHandler: () => auditRun(),
    actionDisabled: mode === 'global',
    color: 'primary'
  };

  const [status, setStatus] = useState({
    type: 'init',
    options: initOptions
  });

  // set data
  useEffect(() => {
    const { metadata, advisories } = content || {};

    if (error) {
      const { summary, code } = error || {};

      const errorOptions = {
        text: summary,
        code
      };

      setStatus({
        type: 'error',
        options: errorOptions
      });

      return;
    }

    if (!content && !loading) {
      return;
    }

    if (!metadata && !advisories) {
      setStatus({
        type: 'dialog'
      });

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
    });

    setStatus(options => ({
      type: 'audit',
      options
    }));
  }, [content, loading, error]);

  const { type, options } = status;
  const {
    dependencies,
    devDependencies,
    optionalDependencies,
    vulnerabilities,
    advisories
  } = metadataValues || {};

  const noVulnerabilities = vulnerabilities && Object.values(vulnerabilities).reduce((total, v) => total + v, 0);

  return (
    <>
      <AppLoader loading={loading} message={message}>
        <div className={classes.root}>
          {type === 'error' && <HelperText {...options} />}
          {type === 'init' && <HelperText {...options} />}
          {type === 'audit' && (
            <>
              <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item lg={4} md={4} sm={12} xl={4}>
                  <StatsCard
                    title={iMessage('title', 'dependencies')}
                    value={dependencies}
                    color="primary"
                    icon={<ListIcon />}
                  />
                  <Hidden smUp>
                    <Typography variant="h6" color="textSecondary">
                      {iMessage('title', 'dependencies')}&nbsp;{dependencies}
                    </Typography>
                  </Hidden>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xl={4}>
                  <StatsCard
                    title={iMessage('title', 'devDependencies')}
                    value={devDependencies}
                    color="danger"
                    icon={<BuildIcon />}
                  />
                  <Hidden smUp>
                    <Typography variant="h6" color="textSecondary">
                      {iMessage('title', 'devDependencies')}&nbsp;
                      {devDependencies}
                    </Typography>
                  </Hidden>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xl={4}>
                  <StatsCard
                    title={iMessage('title', 'optionalDependencies')}
                    value={optionalDependencies}
                    color="warning"
                    icon={<AddIcon />}
                  />
                  <Hidden smUp>
                    <Typography variant="h6" color="textSecondary">
                      {iMessage('title', 'optionalDependencies')}&nbsp;
                      {optionalDependencies}
                    </Typography>
                  </Hidden>
                </Grid>
              </Grid>
              {noVulnerabilities > 0 ? <Advisories
                data={advisories}
                handleAudit={auditRun}
                vulnerabilities={vulnerabilities}
              /> : <HelperText detail={iMessage('info', 'noVulnerabilities')} />}
            </>
          )}
        </div>
      </AppLoader>
      <Dialog
        open={false}
        onClose={() =>
          setStatus({
            type: 'init',
            options: initOptions
          })
        }
        aria-labelledby="audit"
        fullWidth
      >
        <DialogContent>{error && <HelperText {...options} />}</DialogContent>
      </Dialog>
    </>
  );
};

Audit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Audit);
