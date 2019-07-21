import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
    {data && data
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
  const { loading, message, result } = useMappedState(mapState);
  const dispatch = useDispatch();

  if (!result && !loading) {
    const options = {
      text: iMessage('info', 'npmDoctorInfo'),
      actionText: iMessage('action', 'runDoctor'),
      actionHandler: () =>
        dispatch(
          runDoctor({
            ipcEvent: 'npm-doctor',
            cmd: ['doctor']
          })
        )
    };

    return <HelperText {...options} />;
  }

  return (
    <AppLoader loading={loading} message={message}>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <div className={classes.flexContainer}>
            <div className={classes.header}>
              <Typography variant="h6" className={classes.title}>
                {iMessage('title', 'doctor')}
              </Typography>
            </div>
          </div>
          <Divider light />
          <div className={cn(classes.topSection, classes.wrapper)}>
            {renderData(result)}
          </div>
        </div>
      </Paper>
    </AppLoader>
  );
};

Doctor.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Doctor);
