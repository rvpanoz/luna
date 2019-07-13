import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Widget } from 'components/common';
import Typography from '@material-ui/core/Typography';

const StatsWidget = ({ classes, title, value, percent }) => (
  <Widget>
    <div className={classes.topContainer}>
      <div className={classes.horizontal}>
        <Typography color="textSecondary" variant="subtitle1">
          {title}
        </Typography>
      </div>
      <Typography variant="h4" color="textSecondary">
        {value}
      </Typography>
      {percent && <Typography variant="subtitle2" color="primary">
        &nbsp;{percent}%
        </Typography>}
    </div>

  </Widget>
);

const styles = () => ({
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
});

StatsWidget.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  percent: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(StatsWidget);
