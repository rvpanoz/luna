/* eslint-disable */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ControlTypes from 'components/common/ControlTypes';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { addAuditFixOption } from 'models/npm/actions';
import { INFO_MESSAGES } from 'constants/AppConstants';

import styles from './styles/options';

const AuditOptions = ({ classes, packagesInstallOptions, selected }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="subtitle1" className={classes.title}>
        {INFO_MESSAGES.fixOptions}
      </Typography>
      <Divider light />
      <List dense className={classes.list}>
        <ListItem key="package-lock-only">
          <ListItemText
            primary={
              <Typography variant="subtitle1">package-lock only</Typography>
            }
          />
          <ListItemSecondaryAction />
        </ListItem>
        <ListItem key="production-only">
          <ListItemText
            primary={
              <Typography variant="subtitle1">production only</Typography>
            }
          />
          <ListItemSecondaryAction />
        </ListItem>
      </List>
    </div>
  );
};

AuditOptions.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AuditOptions);
