/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import styles from './styles/audit';

const AuditReport = ({ classes, data }) => <div className={classes.root}>
  {!data && <div className={classes.text}>No audit data</div>}
</div>


AuditReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(AuditReport);
