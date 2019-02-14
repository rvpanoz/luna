/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import HomeIcon from '@material-ui/icons/Home';
import UpdateIcon from '@material-ui/icons/Update';

import AppLoader from 'components/common/AppLoader';

import styles from './styles/appCardStyles';

const AppCard = ({
  classes,
  title,
  description,
  statLink,
  small,
  statText,
  statIconColor,
  iconColor,
  loading,
  avatar
}) => (
  <Card className={classes.card}>
    <CardHeader
      classes={{
        root: cn(classes.cardHeader, classes[`${iconColor}CardHeader`]),
        avatar: classes.cardAvatar
      }}
      avatar={avatar && <HomeIcon className={classes.cardIcon} />}
    />
    <CardContent className={classes.cardContent}>
      <AppLoader loading={loading} mini relative>
        <Typography component="p" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography variant="h5" className={classes.cardTitle}>
          {description}
          {small && (
            <Typography variant="caption" className={classes.cardTitleSmall}>
              {small}
            </Typography>
          )}
        </Typography>
      </AppLoader>
    </CardContent>
    <CardActions className={classes.cardActions}>
      <div className={classes.cardStats}>
        <UpdateIcon
          className={cn(
            classes.cardStatsIcon,
            classes[`${statIconColor}CardStatsIcon`]
          )}
        />{' '}
        {statLink && (
          <a href={statLink.href} className={classes.cardStatsLink}>
            {statLink.text}
          </a>
        )}
        {statText && statText}
      </div>
    </CardActions>
  </Card>
);

AppCard.defaultProps = {
  loading: false
};

AppCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  statLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  small: PropTypes.string,
  statText: PropTypes.string,
  statIconColor: PropTypes.string,
  iconColor: PropTypes.string,
  avatar: PropTypes.bool
};

export default withStyles(styles)(AppCard);
