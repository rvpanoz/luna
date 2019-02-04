/* eslint-disable react/require-default-props */
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */

import React, { useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, oneOfType, oneOf, string, node, func } from 'prop-types';
import cn from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import WarningIcon from '@material-ui/icons/WarningOutlined';
import UpdateIcon from '@material-ui/icons/UpdateOutlined';
import BalotIcon from '@material-ui/icons/BallotOutlined';
import BarChartIcon from '@material-ui/icons/BarChartOutlined';

import AppLoader from 'components/layout/AppLoader';

import { switchcase } from 'commons/utils';

import { cardInfoStyles as styles } from './styles';

const defaultStatIcon = null;

const DetailsCard = props => {
  const {
    classes,
    className,
    title,
    description,
    subTitle,
    color,
    link,
    type,
    renderIconType,
    isLoading
  } = props;

  return (
    <Card
      className={cn(classes.card, {
        [className]: Boolean(className)
      })}
    >
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" className={classes.cardTitle}>
          {title}
        </Typography>
        <AppLoader loading={isLoading} mini relative>
          <Typography variant="headline">{subTitle}</Typography>
          <Typography variant="caption">{description}</Typography>
        </AppLoader>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {type &&
          renderIconType(
            cn(classes.cardStatsIcon, classes[`${color}CardStatsIcon`])
          )}
      </CardActions>
    </Card>
  );
};

DetailsCard.propTypes = {
  classes: objectOf(string).isRequired,
  title: string,
  description: oneOfType([string, node]),
  color: oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  className: string,
  link: string,
  type: string,
  renderIconType: func
};

export default withStyles(styles)(DetailsCard);
