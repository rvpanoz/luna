/* eslint-disable */

import React, { useState } from 'react';
import { objectOf, string } from 'prop-types';
import { useMappedState } from 'redux-react-hook';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import AppHeader from 'components/AppHeader';
import Dashboard from 'components/Dashboard';
import Terminal from 'components/layout/Terminal';

import { Packages, Package } from 'components/packages';

import styles from './styles/layout';

const mapState = state => ({
  npmCommands: state.common.commands
});

const Layout = props => {
  const { app, classes } = props;
  const [terminalStatus, setTerminalStatus] = useState(false);
  const { npmCommands } = useMappedState(mapState);

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <section className={classes.header}>
        <AppHeader title={app} />
      </section>
      <section className={classes.main}>
        <div className={classes.container}>
          <Dashboard />
        </div>
        <div className={classes.container}>
          <Grid container justify="space-between">
            <Grid item xs={12} md={6} lg={7} xl={7}>
              <Packages />
            </Grid>
            <Grid item xs={12} md={5} lg={4} xl={4}>
              {terminalStatus ? (
                <Terminal commands={npmCommands} />
              ) : (
                <Package />
              )}
            </Grid>
          </Grid>
        </div>
      </section>
      <div className={classes.console}>
        <Tooltip title="show terminal">
          <IconButton onClick={() => setTerminalStatus(!terminalStatus)}>
            <Icon>call_to_action</Icon>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

Layout.propTypes = {
  app: string.isRequired,
  classes: objectOf(string).isRequired
};

export default withStyles(styles)(Layout);
