/* eslint-disable */

import React from 'react';
import { objectOf, string, number } from 'prop-types';
import { withStyles } from '@material-ui/core';

import { Card } from 'components/common';
import styles from '../styles/statsCard';

const StatsCard = ({ classes, title, value }) => null;

StatsCard.propTypes = {
  classes: objectOf(string).isRequired,
  title: string.isRequired,
  value: number
};

export default withStyles(styles)(StatsCard);
