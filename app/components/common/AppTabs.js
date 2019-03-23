/* eslint-disable react/require-default-props */

import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './styles/appTabs';

const TabContainer = ({ children, loading }) => (
  <Typography component="div" style={{ padding: 8, minHeight: 267 }}>
    {loading ? null : children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool
};

const AppTabs = ({ classes, children }) => {
  const [value, setValue] = useState(0);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(e, tabValue) => setValue(tabValue)}
          indicatorColor="secondary"
          textColor="primary"
        >
          <Tab label="Project" />
          <Tab label="Packages" />
          <Tab label="Tools" />
        </Tabs>
      </AppBar>

      {React.Children.map(children, (child, idx) => {
        if (child.props.loading) {
          return null;
        }

        if (value === idx) {
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
  children: PropTypes.node.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AppTabs);
