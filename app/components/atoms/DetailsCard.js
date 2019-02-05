/* eslint-disable */

/**
 * Card info component
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  objectOf,
  oneOfType,
  oneOf,
  string,
  node,
  object,
  func,
  bool
} from 'prop-types';
import cn from 'classnames';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import { APP_MODES } from 'constants/AppConstants';

import { detailsCardStyles } from './styles';

const CardDetails = ({
  mode,
  directory,
  classes,
  name,
  version,
  description
}) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          title: classes.cardTitle,
          subheader: classes.cardSubtitle
        }}
        title={name}
        subheader={description}
        avatar={<Chip label={version} />}
      />
      <CardContent className={classes.content} />
      <CardActions className={classes.cardActions}>
        <Typography component="p" className={classes.cardActionsText}>
          {mode === APP_MODES.LOCAL && directory}
        </Typography>
      </CardActions>
    </Card>
  );
};

CardDetails.defaultProps = {
  color: 'primary'
};

CardDetails.propTypes = {
  classes: objectOf(string).isRequired,
  name: oneOfType([node, string]),
  description: oneOfType([node, string]),
  version: string,
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

export default withStyles(detailsCardStyles)(CardDetails);
