/* eslint-disable */

/**
 * Package details
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/footer';
import Terminal from './layout/Terminal';

const Footer = props => {
  const { classes } = props;

  return <section className={classes.root} />;
};

export default withStyles(styles)(Footer);
