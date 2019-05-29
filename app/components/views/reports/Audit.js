/* eslint-disable react/require-default-props */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import styles from './styles/audit';

const mapState = ({ npm: { auditData } }) => ({
  auditData
});

const AuditReport = ({ classes }) => {
  const { auditData } = useMappedState(mapState);
  console.log(auditData);

  return (
    <section className={classes.root}>
      {!auditData
        ? 'No audit data found. Please run npm audit from actions'
        : null}
    </section>
  );
};

AuditReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AuditReport);
