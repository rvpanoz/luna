import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import { flexContainer } from 'styles/variables';

const styles = () => ({
  root: {
    padding: '1rem 10px',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  flexContainer: {
    ...flexContainer
  }
});

const Package = ({ classes }) => <Paper className={classes.root} />;

Package.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Package);
