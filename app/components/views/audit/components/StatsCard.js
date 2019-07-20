/* eslint-disable */

import React from 'react';
import { objectOf, string, number } from 'prop-types';
import { withStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import { Card, CardHeader, CardIcon } from 'components/common';
import styles from '../styles/statsCard';

const StatsCard = ({ classes, title, value, color, icon }) => {
  return (
    <Card>
      <CardHeader color={color}>
        <CardIcon color={color}>
          <Icon>{icon}</Icon>
        </CardIcon>
        <Typography className={classes.title}>{value}</Typography>
        <Typography className={classes.cardCategory}>{title}</Typography>
      </CardHeader>
    </Card>
  );
};

StatsCard.defaultProps = {
  icon: 'list'
};

StatsCard.propTypes = {
  classes: objectOf(string).isRequired,
  title: string.isRequired,
  value: number.isRequired,
  color: string,
  icon: string
};

export default withStyles(styles)(StatsCard);
