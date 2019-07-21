/* eslint-disable no-unused-vars */

import React from 'react';
import { useState } from 'react';
import { objectOf, oneOfType, string, array, object } from 'prop-types';
import { withStyles } from '@material-ui/core';
import { groupBy } from 'ramda';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { iMessage, switchcase } from 'commons/utils';
import { AUDIT_TYPES } from 'constants/AppConstants';
import { Widget, Dot } from 'components/common';
import styles from '../styles/listTypes';

const ListTypes = ({ classes, theme, data, vulnerabilities }) => {
  const groupByTitle = groupBy(dataItem => {
    const { title } = dataItem;

    return switchcase({
      [AUDIT_TYPES.PP]: () => 'PP',
      [AUDIT_TYPES.AFO]: () => 'AFO',
      [AUDIT_TYPES.UAF]: () => 'UAF',
      [AUDIT_TYPES.CI]: () => 'CI',
      [AUDIT_TYPES.REDOS]: () => 'REDOS',
      [AUDIT_TYPES.DOS]: () => 'DOS',
      [AUDIT_TYPES.RMD]: () => 'RMD',
      [AUDIT_TYPES.DOSWS]: () => 'DOSWS',
      [AUDIT_TYPES.CINJ]: () => 'CINJ',
      [AUDIT_TYPES.CRWP]: () => 'CRWP',
      [AUDIT_TYPES.OFBR]: () => 'OFBR',
      [AUDIT_TYPES.MEXP]: () => 'MEXP',
      [AUDIT_TYPES.ORED]: () => 'ORED',
      [AUDIT_TYPES.INENT]: () => 'INENT',
      [AUDIT_TYPES.MOV]: () => 'MOV',
      [AUDIT_TYPES.RCEXC]: () => 'RCEXC',
      [AUDIT_TYPES.CSS]: () => 'CSS'
    })('NA')(title);
  });

  const types = groupByTitle(Object.values(data));
  const keys = Object.keys(types);
  const values = Object.values(types);

  const { info = 0, high = 0, critical = 0, moderate = 0, low = 0 } = vulnerabilities || {};
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
  const totalVulnerabilities = typesData.reduce((acc, type) => acc + type.value, 0);

  return (
    <Widget noBodyPadding title={iMessage('title', 'vulnerabilities')}>
      <List>
        {typesData.map(({ value, name, fill }) => (
          <ListItem key={name}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="textSecondary">
                  {name}&nbsp;({<span className={classes[`dot${fill}`]}>{value}</span>})
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <List style={{ display: 'none' }} className={classes.list}>
        {values.map((type, idx) => {
          return (
            <ListItem key={AUDIT_TYPES[keys[idx]]}>
              <ListItemText
                primary={
                  <Typography color="textSecondary" variant="body1">
                    {AUDIT_TYPES[keys[idx]]}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Typography color="textSecondary" variant="h6">
                  {type.length}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Widget>
  );
};

ListTypes.propTypes = {
  classes: objectOf(string).isRequired,
  theme: objectOf(oneOfType([string, object, array])).isRequired,
  data: objectOf(oneOfType([string, array, object])).isRequired
};

export default withStyles(styles, {
  withTheme: true
})(ListTypes);
