/* eslint-disable react/require-default-props */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import styles from './styles/auditReport';

const AuditReport = ({ classes, title, data }) => {
  const [reportData, setReportData] = useState([]);
  const [activeTab, setActiveTab] = useState('0');

  useEffect(() => {
    const contentData =
      data &&
      data.reduce(
        (acc, dataItem) => {
          const { value } = dataItem;
          const isValueArray = Array.isArray(value);

          if (isValueArray) {
            return {
              ...acc,
              vulnerabilities: value
            };
          }

          return {
            ...acc,
            dependencies: [...acc.dependencies, dataItem]
          };
        },
        {
          dependencies: [],
          vulnerabilities: []
        }
      );

    if (contentData) {
      setReportData(contentData);
    }
  }, [data]);

  const { dependencies, vulnerabilities } = reportData || {};

  const renderStatistics = useCallback(
    () => (
      <List>
        {dependencies &&
          dependencies.map(itemDep => (
            <ListItem className={classes.listItem} key={itemDep.name}>
              <ListItemText>{itemDep.name}</ListItemText>
              <ListItemSecondaryAction>{itemDep.value}</ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    ),
    [dependencies, classes]
  );

  const renderVulnerabilities = useCallback(
    () => (
      <List disablePadding>
        {vulnerabilities &&
          vulnerabilities.map(itemDep => (
            <ListItem className={classes.listItem} key={itemDep.name}>
              <ListItemText>{itemDep.name}</ListItemText>
              <ListItemSecondaryAction>{itemDep.value}</ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    ),
    [vulnerabilities, classes]
  );

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.header}>{title}</Typography>
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
      <div className={classes.content}>
        {activeTab === '0' && renderStatistics()}
        {activeTab === '1' && renderVulnerabilities()}
      </div>
    </section>
  );
};

AuditReport.defaultProps = {
  title: 'Results',
  data: []
};

AuditReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(AuditReport);
