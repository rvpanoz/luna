/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, string, node, oneOf } from 'prop-types';
import cn from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import styles from './styles/cardDetails';

const AppCardDetails = props => {
  const { classes, title, subtext, text, color, link } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography component="p" className={classes.cardText}>
          {subtext}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <InfoIcon
          className={cn(
            classes.cardStatsIcon,
            classes[`${color}CardStatsIcon`]
          )}
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
  color: 'blue'
};

AppCardDetails.propTypes = {
  classes: objectOf(string).isRequired,
  color: oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  title: node,
  text: node,
  subtext: string,
  link: string
};

export default withStyles(styles)(AppCardDetails);
