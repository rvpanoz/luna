/* eslint-disable */

/**
 * Card info component
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, object, oneOf, string, node } from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import AppLoader from './AppLoader';

import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import BalotIcon from '@material-ui/icons/Ballot';

import styles from '../styles/cardInfo';

const AppCardInfo = props => {
  const {
    classes,
    title,
    description,
    small,
    text,
    color,
    link,
    loading
  } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader + ' ' + classes[color + 'CardHeader'],
          avatar: classes.cardAvatar
        }}
        avatar={<BalotIcon className={classes.cardIcon} />}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography
          variant="headline"
          component="h2"
          className={classes.cardTitle}
        >
          <AppLoader loading={loading} small={true}>
            {description}
          </AppLoader>
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
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

AppCardInfo.defaultProps = {
  color: 'primary'
};

// AppCardInfo.propTypes = {
//   classes: objectOf(object).isRequired,
//   title: node.isRequired,
//   description: node.isRequired,
//   small: node,
//   color: oneOf([
//     'warning',
//     'primary',
//     'danger',
//     'success',
//     'info',
//     'rose',
//     'gray'
//   ]),
//   text: string
// };

export default withStyles(styles)(AppCardInfo);
