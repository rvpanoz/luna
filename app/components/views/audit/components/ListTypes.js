/* eslint-disable no-unused-vars */

import React from 'react';
import { objectOf, oneOfType, string, array, object, number } from 'prop-types';
import { withStyles } from '@material-ui/core';
import { groupBy } from 'ramda';

import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import {
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

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
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#f44336'];

  const { info = 0, high = 0, critical = 0, moderate = 0, low = 0 } = vulnerabilities || {};
  const typesData = [
    {
      value: critical,
      name: iMessage('label', 'critical'),
      color: 'error'
    },
    {
      value: high,
      name: iMessage('label', 'high'),
      color: 'warning'
    },
    {
      value: moderate,
      name: iMessage('label', 'moderate'),
      color: 'secondary'
    },
    {
      value: low,
      name: iMessage('label', 'low'),
      color: 'primary'
    },
    {
      value: info,
      name: iMessage('label', 'info'),
      color: 'success'
    }
  ];
  const totalVulnerabilities = typesData.reduce((acc, type) => acc + type.value, 0);

  return (
    <Widget noBodyPadding title={`${iMessage('title', 'vulnerabilities')} (${totalVulnerabilities})`}>
      <div className={classes.list}>
        <List>
          {typesData.map(({ value, name, color }) => (
            <ListItem key={name}>
              <ListItemText
                primary={
                  <div className={classes.container}>
                    <Typography variant="body1" color="textSecondary">
                      {name}
                    </Typography>
                    <Dot color={color} className={classes.dot} size="large" />
                  </div>
                }
              />
              <ListItemSecondaryAction>
                <Chip label={value} className={classes.chip} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Hidden mdDown>
          <div style={{ width: '100%', height: 140, display: 'flex', justifyContent: "space-around" }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie cy="85%" startAngle={180} endAngle={0} data={typesData} dataKey="value" outerRadius={80} label>
                  {
                    typesData.map((entry, index) => <Cell key={entry.name} fill={theme.palette[entry.color].main} />)
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Hidden>
      </div>
    </Widget>
  );
};

ListTypes.propTypes = {
  classes: objectOf(string).isRequired,
  theme: objectOf(oneOfType([string, object, array])).isRequired,
  data: objectOf(oneOfType([string, array, object])).isRequired,
  vulnerabilities: objectOf(number).isRequired
};

export default withStyles(styles, {
  withTheme: true
})(ListTypes);
