/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import styles from './styles/doctor';

const DoctorReport = ({ classes, data }) => <div className={classes.root}>
  {!data && <React.Fragment><div className={classes.text}>No doctor data</div> <Button>Run npm doctor</Button></React.Fragment>}
</div>


DoctorReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(DoctorReport);
