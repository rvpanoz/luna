/* eslint-disable */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, object, node, oneOf } from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import styles from '../styles/cardConsole';

const AppCardDetails = props => {
  const { classes, color, title, text } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader + ' ' + classes[color + 'CardHeader']}
        subheader={null}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant="title"
          component="h4"
          className={classes.cardTitle}
        >
          {title}
        </Typography>
        <Typography component="p" className={classes.cardCategory}>
          {text}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardStats}>{text || null} </div>
      </CardActions>
    </Card>
  );
};

AppCardDetails.defaultProps = {
  color: 'orange'
};

AppCardDetails.propTypes = {
  classes: objectOf(object).isRequired,
  color: oneOf(['orange', 'green', 'red', 'blue', 'purple']),
  title: node,
  text: node
};

export default withStyles(styles)(AppCardDetails);
