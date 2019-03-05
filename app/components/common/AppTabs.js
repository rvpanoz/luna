/* eslint-disable react/require-default-props */

import path from 'path';
import React, { useState, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './styles/appTabs';

const TabContainer = ({ children, dir }) => (
  <Typography component="div" style={{ padding: 8 * 2 }}>
    {children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const AppTabs = ({ classes }) => {
  const [value, setValue] = useState(0);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(e, value) => setValue(value)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Project" />
          <Tab label="Packages" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer>project info..</TabContainer>}
      {value === 1 && <TabContainer>packages stats..</TabContainer>}
    </div>
  );
};

AppTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AppTabs);
