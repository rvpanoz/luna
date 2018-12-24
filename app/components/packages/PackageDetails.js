/* eslint-disable */

/**
 * Package details
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardDetails from '../layout/CardDetails';

const styles = {};

const PackageDetails = props => {
  const { classes } = props;

  return (
    <CardDetails
      color="red"
      title="Completed Tasks"
      text="Last Campaign Performance"
    />
  );
};

export default withStyles(styles)(PackageDetails);
