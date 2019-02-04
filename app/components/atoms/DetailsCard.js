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

import InfoIcon from '@material-ui/icons/InfoRounded';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import { detailsCardStyles } from './styles';

const CardDetails = ({ classes, headerColor, data, renderIcon }) => {
  const { projectName, projectVersion, projectDescription } = data || {};

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: cn(classes.cardHeader, classes.cardHeaderColor),
          title: classes.cardTitle,
          subheader: classes.cardSubtitle
        }}
        title={projectName}
        subheader={projectVersion}
      />
      <CardContent>
        <Typography component="p" className={classes.cardDescription}>
          {projectDescription}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardStats}>
          {<InfoIcon className={classes.cardIcon} />}
        </div>
      </CardActions>
    </Card>
  );
};

CardDetails.defaultProps = {
  color: 'primary'
};

CardDetails.propTypes = {
  classes: objectOf(string).isRequired,
  title: node.isRequired,
  description: oneOfType([node, string]),
  small: node,
  color: oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  text: string,
  data: object,
  renderIcon: func,
  headerColor: bool
};

export default withStyles(detailsCardStyles)(CardDetails);
