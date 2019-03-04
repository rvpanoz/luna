/* eslint-disable react/require-default-props */

import path from 'path';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/statsCardStyles';

const StatsCard = ({ classes, title, total }) => (
  <div className={classes.card}>
    <div className={classes.cardBox}>
      <Typography component="div" className={classes.text}>
        {title}
      </Typography>
      <Typography component="div" className={classes.text}>
        {total}
      </Typography>
    </div>
  </div>
);

export default withStyles(styles)(StatsCard);
