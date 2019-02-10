/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import ProjectIcon from '@material-ui/icons/ViewModule';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import { basicCardStyles as styles } from './styles';

const BasicCard = ({ classes, title, value }) => (
  <Card className={classes.card}>
    <CardHeader
      classes={{
        root: classes.cardHeader,
        avatar: classes.cardAvatar
      }}
    />
    <CardContent className={classes.cardContent}>
      <Typography component="p" className={classes.cardCategory}>
        {title}
      </Typography>
      <Typography component="h2" className={classes.cardTitle}>
        {value}
      </Typography>
    </CardContent>
    <CardActions className={classes.cardActions}>
      <ProjectIcon className={cn(classes.cardIcon)} />
      <Typography component="p" className={classes.cardActionsText} />
    </CardActions>
  </Card>
);

BasicCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default withStyles(styles)(BasicCard);
