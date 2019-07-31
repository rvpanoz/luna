import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import { iMessage } from 'commons/utils';

import styles from './styles/settings';

const Settings = ({ classes, ...restProps }) => {
  const [settings, setSettings] = useState({
    metricsRegistry: '',
    auditLevel: '',
    cache: ''
  });

  useEffect(() => {
    const { metricsRegistry, auditLevel, cache } = restProps;

    setSettings({
      ...settings,
      metricsRegistry,
      auditLevel,
      cache
    })
  }, [restProps, settings])

  return <div className={classes.root}>
    <List>
      {Object.keys(settings).map(setting => {
        return <ListItem key={setting}>
          <ListItemText
            primary={
              <Typography>{settings[setting]}</Typography>
            }
            secondary={
              <Typography color="textSecondary">
                {setting}
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <Button variant="outlined" color="primary">{iMessage('action', 'change')}</Button>
          </ListItemSecondaryAction>
        </ListItem>
      })}
    </List>
  </div>
}

Settings.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Settings);
