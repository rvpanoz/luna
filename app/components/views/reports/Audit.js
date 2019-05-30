/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/audit';

const AuditReport = ({ classes, data }) => {
  if (!data) {
    return 'No audit data';
  }

  return <div className={classes.root} />;
};

AuditReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(AuditReport);
