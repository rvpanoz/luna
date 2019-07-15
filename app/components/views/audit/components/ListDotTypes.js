/* eslint-disable no-unused-vars */

import React from 'react';
import { objectOf, oneOfType, string, array, object } from 'prop-types';
import { withStyles } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { iMessage } from 'commons/utils';
import { Widget, Dot } from 'components/common';
import styles from '../styles/listDotTypes';

const ListDotTypes = ({ classes, types }) => (
  <Widget title={iMessage('title', 'vulnerabilities')}>
    <List className={classes.container}>
      {types.map(({ value, name, color }) => (
        <ListItem key={name}>
          <ListItemText
            primary={
              <Typography variant="subtitle1" color="textSecondary">
                {name}&nbsp;({value})
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  </Widget>
);

ListDotTypes.propTypes = {
  classes: objectOf(string).isRequired,
  types: oneOfType([array, object]).isRequired
};

export default withStyles(styles)(ListDotTypes);
