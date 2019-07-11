import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Grid from '@material-ui/core/Grid';
import Widget from 'components/common/Widget';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core';
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons';

const StatsWidget = ({ classes, title, value, theme, percent, color }) => (
  <Widget
    header={
      <div className={classes.title}>
        <Typography variant="h4" color="textSecondary">
          {title}
        </Typography>
      </div>
    }
    upperTitle
  >
    <div className={classes.totalValueContainer}>
      <div className={classes.totalValue}>
        <Typography variant="h4" color="textSecondary">
          {value}
        </Typography>
        <Typography variant="subtitle2" color="secondary">
          &nbsp;{percent}%
        </Typography>
      </div>
    </div>
    <div className={classes.bottomStatsContainer}>
      <div className={cn(classes.statCell, classes.borderRight)}>
        <Grid container alignItems="center">
          <Typography variant="h4">{value}</Typography>
          <ArrowForwardIcon />
        </Grid>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
      </div>
      <div className={classes.statCell}>
        <Grid container alignItems="center">
          <Typography variant="h4">{percent}%</Typography>
          <ArrowForwardIcon className={classes.profitArrow} />
        </Grid>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
      </div>
    </div>
  </Widget>
);

const styles = theme => ({
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing.unit
  },
  bottomStatsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing.unit * -2,
    marginTop: theme.spacing.unit
  },
  statCell: {
    padding: theme.spacing.unit * 2
  },
  totalValueContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  totalValue: {
    display: 'flex',
    alignItems: 'baseline'
  },
  profitArrow: {
    transform: 'rotate(-45deg)',
    fill: theme.palette.primary.main
  },
  profitArrowDanger: {
    transform: 'rotate(45deg)',
    fill: theme.palette.secondary.main
  }
});

StatsWidget.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  percent: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(StatsWidget);
