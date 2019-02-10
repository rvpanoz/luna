/* eslint-disable react/require-default-props */

import React, { useState } from 'react';
import { objectOf, string } from 'prop-types';
import { useMappedState } from 'redux-react-hook';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Header from 'components/Header';
import Dashboard from 'components/Dashboard';
import Terminal from 'components/layout/Terminal';

import { Packages, PackageDetails } from 'components/packages';

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
        <Header title={app} />
      </section>
      <section className={classes.main}>
        <div className={classes.container}>
          <Dashboard />
        </div>
        <div className={classes.container}>
          <Grid container justify="space-between">
            <Grid item xs={12} md={7} lg={7} xl={8}>
              <Packages />
            </Grid>
            <Grid item xs={12} md={4} lg={4} xl={4}>
              {terminalStatus ? (
                <Terminal commands={npmCommands} />
              ) : (
                <PackageDetails />
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
