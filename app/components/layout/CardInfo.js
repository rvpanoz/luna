/* eslint-disable */

/**
 * Card info component
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, object, oneOf, string, node } from 'prop-types';
import cn from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import AppLoader from './AppLoader';

import WarningIcon from '@material-ui/icons/WarningOutlined';
import UpdateIcon from '@material-ui/icons/UpdateOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import BalotIcon from '@material-ui/icons/BallotOutlined';

import { switchcase } from '../../commons/utils';

import styles from '../styles/cardInfo';

const AppCardInfo = props => {
  const {
    classes,
    avatar,
    title,
    description,
    small,
    text,
    color,
    link,
    loading,
    type
  } = props;

  const defaultAvatarIcon = <BalotIcon className={classes.cardIcon} />;
  const defaultStatIcon = <InfoIcon className={classes.cardIcon} />;

  const renderAvatarIcon = type => {
    const icon = switchcase({
      info: () => defaultAvatarIcon,
      update: () => <UpdateIcon className={classes.cardIcon} />,
      warning: () => <WarningIcon className={classes.cardIcon} />
    })(defaultAvatarIcon)(type);

    return icon;
  };

  const renderStatIcon = type => {
    const icon = switchcase({
      info: () => defaultStatIcon,
      update: () => (
        <UpdateIcon
          className={
            classes.cardStatsIcon + ' ' + classes[type + 'CardStatsIcon']
          }
        />
      ),
      warning: () => (
        <WarningIcon
          className={
            classes.cardStatsIcon + ' ' + classes[type + 'CardStatsIcon']
          }
        />
      )
    })(defaultStatIcon)(type);

    return icon;
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: cn(classes.cardHeader, {
            [classes[color + 'CardHeader']]: color && avatar
          }),
          avatar: classes.cardAvatar
        }}
        avatar={renderAvatarIcon(type)}
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
          {description}
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {renderStatIcon(type)}
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
