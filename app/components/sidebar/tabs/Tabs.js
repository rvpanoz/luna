import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import { bool, node, objectOf, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PackagesIcon from '@material-ui/icons/ListTwoTone';
import HistoryIcon from '@material-ui/icons/HistoryTwoTone';
import ActionsIcon from '@material-ui/icons/TextFormatTwoTone';

import styles from './styles';

const TabContainer = ({ children, loading }) => (
  <Typography component="div" style={{ padding: 8, minHeight: 265 }}>
    {loading ? null : children}
  </Typography>
);

TabContainer.propTypes = {
  children: node.isRequired,
  loading: bool,
};

const SidebarTabs = ({ classes, className, children }) => {
  const [value, setValue] = useState(0);

  return (
    <div
      className={cn(classes.root, {
        [className]: className !== undefined,
      })}
    >
      <AppBar position="static" color="inherit">
        <Tabs value={value} onChange={(e, tabValue) => setValue(tabValue)}>
          <Tab
            classes={{
              root: classes.tabLabel,
            }}
            icon={<PackagesIcon />}
          />
          <Tab
            classes={{
              root: classes.tabLabel,
            }}
            icon={<HistoryIcon />}
          />
          <Tab
            classes={{
              root: classes.tabLabel,
            }}
            icon={<ActionsIcon />}
          />
        </Tabs>
      </AppBar>

      {React.Children.map(children, (child, idx) => {
        if (value === idx) {
          return (
            <TabContainer>
              {React.cloneElement(child, {
                items: child.props.items,
                metadata: child.props.metadata,
              })}
            </TabContainer>
          );
        }

        return null;
      })}
    </div>
  );
};

SidebarTabs.propTypes = {
  children: node.isRequired,
  classes: objectOf(string).isRequired,
  className: string,
};

export default withStyles(styles)(SidebarTabs);
