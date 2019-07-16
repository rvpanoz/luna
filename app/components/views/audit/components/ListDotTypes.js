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

const ListDotTypes = ({ classes, data, theme }) => {
  const { info, high, critical, moderate, low } = data;
  const typesData = [
    {
      value: critical,
      name: iMessage('label', 'critical'),
      fill: theme.palette.error.main
    },
    {
      value: high,
      name: iMessage('label', 'high'),
      fill: theme.palette.warning.main
    },
    {
      value: moderate,
      name: iMessage('label', 'moderate'),
      fill: theme.palette.secondary.main
    },
    {
      value: low,
      name: iMessage('label', 'low'),
      fill: theme.palette.primary.main
    },
    {
      value: info,
      name: iMessage('label', 'info'),
      fill: theme.palette.info.main
    }
  ];

  return (
    <Widget title={iMessage('title', 'vulnerabilities')}>
      <List className={classes.container}>
        {typesData.map(({ value, name, color }) => (
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
};

ListDotTypes.propTypes = {
  classes: objectOf(string).isRequired,
  data: oneOfType([array, object]).isRequired,
  theme: objectOf(oneOfType([string, object, array])).isRequired
};

export default withStyles(styles, {
  withTheme: true
})(ListDotTypes);
