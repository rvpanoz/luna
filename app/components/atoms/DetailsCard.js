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

import AppLoader from 'components/layout/AppLoader';
import { detailsCardStyles as styles } from './styles';

const renderChip = version => <Chip label={version} />;

const CardDetails = ({
  mode,
  directory,
  classes,
  name,
  version,
  license,
  author,
  description,
  lastUpdatedAt,
  loading
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
        title={`Project ${name ? name : ''}`}
        subheader={
          <div className={cn(classes.flexContainer, classes.subheader)}>
            <div className={classes.flexItem}>{license}</div>
            {version && <div className={classes.flexItem}>v{version}</div>}
            {author && author.name && (
              <div className={classes.flexItem}>{author.name}</div>
            )}
          </div>
        }
      />
      <CardContent className={classes.cardContent}>
        <AppLoader relative mini loading={loading}>
          <div className={cn(classes.flexItem, classes.cardDescription)}>
            {description || 'Showing global packages'}
          </div>
        </AppLoader>
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
