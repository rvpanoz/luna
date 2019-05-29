/* eslint-disable react/require-default-props */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
  const [activeTab, setActiveTab] = useState('0');

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.header}>Audit results</Typography>
        <div className={classes.tabs}>
          <Tabs
            value={activeTab}
            textColor="primary"
            onChange={(e, value) => setActiveTab(value)}
            classes={{
              indicator: classes.indicator
            }}
          >
            <Tab label="Statistics" value="0" />
            <Tab label="Vulnerabilities" value="1" />
          </Tabs>
        </div>
      </div>
    </section>
  );
};

AuditReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AuditReport);
