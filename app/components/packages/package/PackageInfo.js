/* eslint-disable */

import React, { useState, useCallback } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ViewIcon from '@material-ui/icons/ViewArray';
import styles from './styles/packageInfo';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 }}>
      {props.children}
    </Typography>
  );
}

const renderVersions = versions => (
  <List style={{ maxHeight: 400, overflow: 'auto' }}>
    {versions &&
      versions.map(version => (
        <ListItem key={`${version}`}>
          <ListItemText primary={version} />
          <ListItemSecondaryAction>
            <IconButton aria-label="View version">
              <ViewIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
  </List>
);

const PackageInfoDetails = ({ classes, versions, dependencies }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={activeTab}
          onChange={(e, value) => setActiveTab(value)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Versions" />
          <Tab label="Dependencies" />
        </Tabs>
      </AppBar>
      {activeTab === 0 && (
        <TabContainer>{versions && renderVersions(versions)}</TabContainer>
      )}
      {activeTab === 1 && <TabContainer>textB</TabContainer>}
    </div>
  );
};

export default withStyles(styles)(PackageInfoDetails);
