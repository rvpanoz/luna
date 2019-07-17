import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { runAudit } from 'models/npm/actions';
import { iMessage } from 'commons/utils';
import { AppLoader, HelperText } from 'components/common';

import {
  Actions,
  Advisories,
  AdvisoryDetails,
  ListDotTypes,
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
  npm: { auditData }
}) => ({
  loading,
  message,
  mode,
  directory,
  auditData
});

const Audit = ({ classes }) => {
  const dispatch = useDispatch();
  const { loading, message, mode, auditData } = useMappedState(mapState);

  const [active, setActive] = useState(null);
  const { content, error } = auditData || {};

  if (error) {
    const props = Object.assign({}, error, {
      isError: true
    });

    return <HelperText {...props} />;
  }

  if (!content && !loading) {
    const options = {
      text: iMessage('info', 'npmAuditInfo'),
      detail: mode === 'global' ? iMessage('warning', 'noGlobalAudit') : null,
      actionText: iMessage('action', 'runAudit'),
      actionHandler: () =>
        dispatch(
          runAudit({
            ipcEvent: 'npm-audit',
            cmd: ['audit']
          })
        ),
      actionDisabled: mode === 'global'
    };

    return <HelperText {...options} />;
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

  return (
    <AppLoader loading={loading} message={message}>
      <div className={classes.root}>
        <Hidden mdDown>
          <Grid container spacing={8} className={classes.gridContainer}>
            <Grid item lg={6} md={6} sm={12} xl={6}>
              <StatsCard
                title={iMessage('title', 'dependencies')}
                value={dependencies}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xl={6}>
              <StatsCard
                title={iMessage('title', 'devDependencies')}
                value={devDependencies}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xl={6}>
              <StatsCard
                title={iMessage('title', 'optionalDependencies')}
                value={optionalDependencies}
              />
            </Grid>
            <Grid item xs={6} sm={12} md={6} lg={6} xl={6}>
              <ListDotTypes data={vulnerabilities} />
            </Grid>
          </Grid>
        </Hidden>
        <Grid container spacing={8} className={classes.gridContainer}>
          <Grid
            item
            sm={12}
            md={9}
            lg={9}
            xl={9}
            className={classes.transition}
          >
            <Advisories
              data={advisories}
              handleClick={setActive}
              runAudit={() =>
                dispatch(
                  runAudit({
                    ipcEvent: 'npm-audit',
                    cmd: ['audit']
                  })
                )
              }
            />
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
    </AppLoader>
  );
};

Audit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles, { withTheme: false })(Audit);
