/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import { basicCardStyles as styles } from './styles';

const BasicCard = ({ classes, title, description, iconColor, small }) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          avatar: classes.cardAvatar
        }}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.cardCategory}>
          Dependencies
        </Typography>
        <Typography
          variant="headline"
          component="h2"
          className={classes.cardTitle}
        >
          99
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <ViewModuleOutlinedIcon
          className={cn(classes.cardIcon, classes.infoCardIcon)}
        />
      </CardActions>
    </Card>
  );
};

BasicCard.propTypes = {
  title: PropTypes.string
};

export default withStyles(styles)(BasicCard);
