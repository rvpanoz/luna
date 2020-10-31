import React from 'react';
import { objectOf, string, arrayOf } from 'prop-types';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './styles';

const PackageDependencies = ({ classes, dependencies }) => {
  const dependenciesNames = Object.keys(dependencies);
  const enhancedDependencies = dependenciesNames.map((dependency) => ({
    name: dependency,
    version: dependencies[dependency],
  }));

  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <Typography>{`Dependencies (${enhancedDependencies.length})`}</Typography>
      </div>
      <Divider />
      <List
        dense
        style={{ overflowY: 'scroll', minWidth: 225, maxHeight: 425 }}
      >
        {enhancedDependencies.map((dependency) => (
          <ListItem key={dependency.name} className={classes.listItem}>
            <ListItemText
              primary={
                <Typography color="textSecondary" variant="body2">
                  {dependency.name}
                </Typography>
              }
              secondary={
                <Typography color="textSecondary" variant="body2">
                  {dependency.version}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

PackageDependencies.propTypes = {
  classes: objectOf(string).isRequired,
  dependencies: objectOf(string).isRequired,
};

export default withStyles(styles)(PackageDependencies);
