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

import styles from './styles/appCardStyles';

const AppCard = ({
  classes,
  title,
  description,
  statLink,
  small,
  statText,
  statIconColor,
  iconColor
}) => (
  <Card className={classes.card}>
    <CardHeader
      classes={{
        root: cn(classes.cardHeader, classes[`${iconColor}CardHeader`]),
        avatar: classes.cardAvatar
      }}
      avatar={<HomeIcon className={classes.cardIcon} />}
    />
    <CardContent className={classes.cardContent}>
      <Typography component="p" className={classes.cardCategory}>
        {title}
      </Typography>
      <Typography variant="h5" className={classes.cardTitle}>
        {/* {description} */}
        {small !== undefined ? (
          <small className={classes.cardTitleSmall}>{small}</small>
        ) : null}
      </Typography>
    </CardContent>
    <CardActions className={classes.cardActions}>
      <div className={classes.cardStats}>
        <UpdateIcon
          className={cn(
            classes.cardStatsIcon,
            classes[`${statIconColor}CardStatsIcon`]
          )}
        />{' '}
        {statLink !== undefined ? (
          <a href={statLink.href} className={classes.cardStatsLink}>
            {statLink.text}
          </a>
        ) : statText !== undefined ? (
          statText
        ) : null}
      </div>
    </CardActions>
  </Card>
);

export default withStyles(styles)(AppCard);
