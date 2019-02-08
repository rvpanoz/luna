/* eslint-disable */

/**
 * Card info component
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, oneOfType, oneOf, string, node } from 'prop-types';
import cn from 'classnames';

import ProjectIcon from '@material-ui/icons/ViewModule';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import { APP_MODES } from 'constants/AppConstants';
import { detailsCardStyles as styles } from './styles';

const CardDetails = ({
  mode,
  directory,
  classes,
  name,
  version,
  license,
  author,
  lastUpdatedAt
}) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          title: classes.cardTitle,
          subheader: classes.cardSubheader,
          content: classes.cardHeaderContent
        }}
        title={name || 'Project'}
        subheader={mode === APP_MODES.LOCAL && mode}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.flexItem}>
          Author:&nbsp;{author && author.name}
        </div>
        <div className={classes.flexItem}>
          Author:&nbsp;{author && author.name}
        </div>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <ProjectIcon className={cn(classes.cardIcon, classes.infoCardIcon)} />
        <Typography component="p" className={classes.cardActionsText}>
          {`Updated at: ${lastUpdatedAt}`}
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
