import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from 'components/common/Paper';

import styles from './styles/statsCard';

const StatsCard = ({ classes, ...rest }) => {
  const rootClassName = classNames(classes.root);
  const { title, count, total } = rest;
  const value = (count / total).toFixed(2);

  return (
    <Paper {...rest} className={rootClassName}>
      <div className={classes.content}>
        <div className={classes.details}>
          <Typography className={classes.title} variant="body2">
            {title}
          </Typography>
          <Typography className={classes.value} variant="h3">
            {count}
          </Typography>
        </div>
        <div className={classes.iconWrapper}>{value * 100}%</div>
      </div>
    </Paper>
  );
};

StatsCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default withStyles(styles)(StatsCard);
