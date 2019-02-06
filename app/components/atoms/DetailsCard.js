/* eslint-disable */

/**
 * Card info component
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, oneOfType, oneOf, string, node } from 'prop-types';
import cn from 'classnames';
import WarningIcon from '@material-ui/icons/Warning';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import { APP_MODES, APP_INFO } from 'constants/AppConstants';

import npmAvatar from 'assets/images/npm.png';
import { detailsCardStyles as styles } from './styles';

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
          subheader: classes.cardSubtitle,
          content: classes.cardHeaderContent
        }}
        title={name || 'Global'}
        subheader={version ? `v.${version}` : null}
      />
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardDescription}>
          {description || APP_INFO.NOT_AVAILABLE}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <WarningIcon
          className={cn(classes.cardIcon, classes.warningCardIcon)}
        />
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

export default withStyles(styles)(CardDetails);
