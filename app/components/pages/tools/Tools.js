import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';

const Tools = props => (
  <Grid container spacing={16}>
    <Grid item xs={12} md={6}>
      <Typography variant="h6" className={classes.title}>
        npm tools
      </Typography>
      <div className={classes.demo}>
        <List dense={dense}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Audit"
              secondary={
                'Scan your project for vulnerabilities and automatically install any compatible updates to vulnerable dependencies.'
              }
            />
          </ListItem>
        </List>
      </div>
    </Grid>
  </Grid>
);

export default withStyles(styles)(Tools);
