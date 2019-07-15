/* eslint-disable no-unused-vars */

import React from 'react';
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
import { Widget } from 'components/common';
import styles from '../styles/listTypes';

const ListTypes = ({ classes, theme, data }) => {
  const groupByTitle = groupBy(dataItem => {
    const { title } = dataItem;
    const newTitle = title && title.trim();

    return switchcase({
      [AUDIT_TYPES.PP.trim()]: () => 'PP',
      [AUDIT_TYPES.AFO.trim()]: () => 'AFO',
      [AUDIT_TYPES.UAF.trim()]: () => 'UAF',
      [AUDIT_TYPES.CI.trim()]: () => 'CI',
      [AUDIT_TYPES.REDOS.trim()]: () => 'REDOS',
      [AUDIT_TYPES.DOS.trim()]: () => 'DOS',
      [AUDIT_TYPES.RMD.trim()]: () => 'RMD',
      [AUDIT_TYPES.DOSWS.trim()]: () => 'DOSWS',
      [AUDIT_TYPES.CINJ.trim()]: () => 'CINJ',
      [AUDIT_TYPES.CRWP.trim()]: () => 'CRWP',
      [AUDIT_TYPES.OFBR.trim()]: () => 'OFBR',
      [AUDIT_TYPES.MEXP.trim()]: () => 'MEXP',
      [AUDIT_TYPES.ORED.trim()]: () => 'ORED',
      [AUDIT_TYPES.INENT.trim()]: () => 'INENT',
      [AUDIT_TYPES.MOV.trim()]: () => 'MOV',
      [AUDIT_TYPES.RCEXC.trim()]: () => 'RCEXC',
      [AUDIT_TYPES.CSS.trim()]: () => 'CSS'
    })('NA')(newTitle);
  });

  const types = groupByTitle(Object.values(data));
  const keys = Object.keys(types);
  const values = Object.values(types);

  return (
    <Widget noBodyPadding title={iMessage('title', 'group_title')}>
      <List className={classes.body}>
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
  data: oneOfType([array, object]).isRequired
};

export default withStyles(styles, {
  withTheme: true
})(ListTypes);
