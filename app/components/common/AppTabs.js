import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bool, node, objectOf, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './styles/appTabs';

const TabContainer = ({ children, loading }) => (
  <Typography component="div" style={{ padding: 8, minHeight: 265 }}>
    {loading ? null : children}
  </Typography>
);

TabContainer.propTypes = {
  children: node.isRequired,
  loading: bool,
};

const AppTabs = ({ classes, children }) => {
  const [value, setValue] = useState(0);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs value={value} onChange={(e, tabValue) => setValue(tabValue)}>
          <Tab
            classes={{
              root: classes.tabLabel,
            }}
            label="Project"
          />
          <Tab
            classes={{
              root: classes.tabLabel,
            }}
            label="Actions"
          />
          <Tab
            classes={{
              root: classes.tabLabel,
            }}
            label="History"
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

AppTabs.propTypes = {
  children: node.isRequired,
  classes: objectOf(string).isRequired,
};

export default withStyles(styles)(AppTabs);
