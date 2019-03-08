/* eslint-disable react/require-default-props */

import path from 'path';
import React, { useState, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';

import AppLoader from 'components/common/AppLoader';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './styles/appTabs';

const TabContainer = ({ children, loading }) => (
  <Typography component="div" style={{ padding: 8, minHeight: 215 }}>
    {loading ? null : children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const AppTabs = ({ classes, children }) => {
  const [value, setValue] = useState(0);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(e, value) => setValue(value)}
          indicatorColor="primary"
          textColor="secondary"
        >
          <Tab label="Project" />
          <Tab label="Packages" />
          <Tab label="Tools" />
        </Tabs>
      </AppBar>

      {React.Children.map(children, (child, idx) => {
        if (child.props.loading) {
          return null;
        } else if (value === idx) {
          return (
            <TabContainer>
              {React.cloneElement(child, {
                items: child.props.items,
                metadata: child.props.metadata
              })}
            </TabContainer>
          );
        }
      })}
    </div>
  );
};

AppTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AppTabs);
