import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Widget } from 'components/common';
import Typography from '@material-ui/core/Typography';

const StatsWidget = ({ classes, title, value, percent }) => (
  <Widget title={title}>
    <div className={classes.container}>
      <div className={classes.horizontal}>
        <Typography variant="h4" color="textSecondary">
          {value}
        </Typography>
        {percent && <Typography variant="subtitle2" color="primary">
          &nbsp;{percent}%
        </Typography>}
      </div>
    </div>
  </Widget>
);

const styles = theme => ({
  container: {
    width: '100%',
    padding: theme.spacing.unit
  },
  horizontal: {
    display: 'flex',
  }
});

StatsWidget.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  value: PropTypes.number.isRequired,
  title: PropTypes.string,
  percent: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(StatsWidget);
