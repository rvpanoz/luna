import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from 'components/common/Paper';

import VersionsIcon from '@material-ui/icons/LabelOutlined';
import styles from './styles/statsCard';

const StatsCard = ({ classes, ...rest }) => {
  const rootClassName = classNames(classes.root);
  const { title, countDependencies, totalDependencies, footer } = rest;

  return (
    <Paper {...rest} className={rootClassName}>
      <div className={classes.content}>
        <div className={classes.details}>
          <Typography className={classes.title} variant="body2">
            {title}
          </Typography>
          <Typography className={classes.value} variant="h3">
            {countDependencies}
          </Typography>
        </div>
        <div className={classes.iconWrapper}>
          {(countDependencies / totalDependencies) * 100}%
        </div>
      </div>
      {footer && (
        <div className={classes.footer}>
          <Typography className={classes.difference} variant="body2" />
          <Typography className={classes.caption} variant="caption" />
        </div>
      )}
    </Paper>
  );
};

StatsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  countDependencies: PropTypes.number.isRequired,
  totalDependencies: PropTypes.number.isRequired
};

export default withStyles(styles)(StatsCard);
