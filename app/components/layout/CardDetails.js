/* eslint-disable */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, object, node, oneOf } from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import InfoIcon from '@material-ui/icons/InfoOutlined';
import styles from '../styles/cardDetails';

const AppCardDetails = props => {
  const { classes, title, subtext, text, color, link } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography
          variant="title"
          component="h4"
          className={classes.cardTitle}
        >
          {title}
        </Typography>
        <Typography component="p" className={classes.cardCategory}>
          {subtext}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <InfoIcon
          className={
            classes.cardStatsIcon + ' ' + classes[color + 'CardStatsIcon']
          }
        />
        {link !== undefined ? (
          <a href={link.href} className={classes.cardStatsLink}>
            {link.text}
          </a>
        ) : text !== undefined ? (
          <small className={classes.text}>{text}</small>
        ) : null}
      </CardActions>
    </Card>
  );
};

AppCardDetails.defaultProps = {
  color: 'info',
  text: 'No working directory'
};

// AppCardDetails.propTypes = {
//   classes: objectOf(object).isRequired,
//   color: oneOf(['orange', 'green', 'red', 'blue', 'purple']),
//   title: node,
//   text: node
// };

export default withStyles(styles)(AppCardDetails);
