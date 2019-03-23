/* eslint-disable */

import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SearchIcon from '@material-ui/icons/Search';
import ViewIcon from '@material-ui/icons/ViewArray';

import AppTabs from 'components/common/AppTabs';

import styles from './styles/packageInfo';

const TabContainer = ({ children }) => {
  return (
    <Typography component="div" style={{ padding: 8 }}>
      {children}
    </Typography>
  );
};

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

const renderDependencies = dependencies => {
  const dependenciesKeys = Object.keys(dependencies);

  return (
    <List style={{ maxHeight: 400, overflow: 'auto' }}>
      {dependenciesKeys &&
        dependenciesKeys.map(dependency => {
          return (
            <ListItem key={`${dependency}`}>
              <ListItemText
                primary={`${dependency} - v${dependencies[dependency]}`}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="View version">
                  <SearchIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
    </List>
  );
};

const PackageInfoDetails = ({
  classes,
  name,
  license,
  versions,
  dependencies
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Paper elevation={2} className={classes.root}>
      <Typography>License:&nbsp;{`${license}`}</Typography>
      <Divider />
      <AppTabs>
        <div>{renderDependencies(dependencies)}</div>
      </AppTabs>
      {/* <AppBar position="static" color="default">
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
      {activeTab === 1 && (
        <TabContainer>{renderDependencies(dependencies)}</TabContainer>
      )} */}
    </Paper>
  );
};

export default withStyles(styles)(PackageInfoDetails);
