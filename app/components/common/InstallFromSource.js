/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import styles from './styles/installFromSources';

const InstallFromSource = ({ classes }) => (
  <div className={classes.paper}>
    <List dense>
      <ListItem key="project-install" className={classes.listItem}>
        <ListItemText
          primary={
            <Typography className={classes.title}>package.json</Typography>
          }
          secondary={
            <Typography className={classes.description} component="p">
              Install the dependencies from package.json file. The command will
              make use of the current selected directory package.json file.
            </Typography>
          }
        />
      </ListItem>
    </List>
  </div>
);

InstallFromSource.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(InstallFromSource);
