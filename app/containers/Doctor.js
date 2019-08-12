import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import CheckIcon from '@material-ui/icons/CheckOutlined';

import { AppLoader, HelperText } from 'components/common';
import { iMessage } from 'commons/utils';
import { runDoctor } from 'models/npm/actions';

import styles from './styles/doctor';

const mapState = ({
  ui: {
    loaders: {
      doctorLoader: { loading, message }
    }
  },
  npm: {
    doctor: { error, result }
  }
}) => ({
  loading,
  message,
  result,
  error
});

const renderData = data => (
  <List disablePadding>
    {data &&
      data
        .filter(value => value.length)
        .map(dataValue => (
          <ListItem key={dataValue}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: '#fff' }}>
                <CheckIcon color="secondary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={dataValue} />
          </ListItem>
        ))}
  </List>
);

const Doctor = ({ classes }) => {
  const { loading, message, result, error } = useMappedState(mapState);
  const [status, setStatus] = useState({
    type: result ? 'doctor' : 'init',
    options: null
  });
  const dispatch = useDispatch();
  const { type } = status;

  const handleDoctor = () =>
    dispatch(
      runDoctor({
        ipcEvent: 'npm-doctor',
        cmd: ['doctor']
      })
    );

  const initOptions = {
    text: iMessage('info', 'npmDoctorInfo'),
    actionText: iMessage('action', 'runDoctor'),
    actionHandler: handleDoctor,
    color: 'primary'
  };

  useEffect(() => {
    setStatus(options => ({
      ...options,
      type: result ? 'doctor' : 'init',
      options: result ? null : options
    }));
  }, [result, loading]);

  // set error
  useEffect(() => {
    if (error) {
      const { summary, code } = error || {};

      const errorOptions = {
        text: summary,
        code
      };

      setStatus({
        type: 'error',
        options: errorOptions
      });
    }
  }, [error]);

  return (
    <AppLoader loading={loading} message={message}>
      <div className={classes.root}>
        {type === 'init' && <HelperText {...initOptions} />}
        {type === 'doctor' && (
          <Grid className={classes.container} container>
            <Grid item sm={12}>
              <div className={cn(classes.topSection, classes.wrapper)}>
                {renderData(result)}
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    </AppLoader>
  );
};

Doctor.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Doctor);
