/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, oneOfType, oneOf, string, node, bool } from 'prop-types';
import cn from 'classnames';

import ProjectIcon from '@material-ui/icons/ViewModule';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import AppLoader from 'components/common/AppLoader';
import { detailsCardStyles as styles } from './styles';

const CardDetails = ({
  classes,
  title,
  aside,
  text,
  lastUpdatedAt,
  loading
}) => (
  <Card className={classes.card}>
    <CardHeader
      classes={{
        root: classes.cardHeader,
        title: classes.cardTitle,
        subheader: classes.cardSubheader,
        content: classes.cardHeaderContent
      }}
      title={title}
      subheader={
        <div className={cn(classes.flexContainer, classes.subheader)}>
          <div className={classes.flexItem}>{aside}</div>
        </div>
      }
    />
    <CardContent className={classes.cardContent}>
      <AppLoader relative mini loading={loading}>
        <div className={cn(classes.flexItem, classes.cardDescription)}>
          {text}
        </div>
      </AppLoader>
    </CardContent>
    <CardActions className={classes.cardActions}>
      <ProjectIcon className={cn(classes.cardIcon, classes.infoCardIcon)} />
      <Typography component="p" className={classes.cardActionsText}>
        {`Updated: ${lastUpdatedAt}`}
      </Typography>
    </CardActions>
  </Card>
);

CardDetails.defaultProps = {
  color: 'primary'
};

CardDetails.propTypes = {
  classes: objectOf(string).isRequired,
  title: oneOfType([node, string]),
  text: oneOfType([node, string]),
  loading: bool,
  mode: string,
  aside: string,
  lastUpdatedAt: string,
  color: oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ])
};

export default withStyles(styles)(CardDetails);
