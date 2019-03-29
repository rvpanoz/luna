import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  }
});

const AppError = ({ classes, error }) => (
  <Typography className={classes.root} variant="body2">
    {error}
  </Typography>
);

AppError.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  error: PropTypes.string.isRequired
};

export default withStyles(styles)(AppError);
