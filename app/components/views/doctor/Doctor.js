import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'redux-react-hook';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import CheckIcon from '@material-ui/icons/CheckOutlined';

import { HelperText } from 'components/common';
import { iMessage } from 'commons/utils';
import { runDoctor } from 'models/npm/actions';

import styles from './styles/doctor';

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

const Doctor = ({ classes, data }) => {
  const dispatch = useDispatch();

  if (!data) {
    const options = {
      text: iMessage('info', 'npmAuditInfo'),
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
    <React.Fragment>
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
          <div className={classes.topSection}>{renderData(data)}</div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

Doctor.defaultProps = {
  data: null
};

Doctor.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(Doctor);
