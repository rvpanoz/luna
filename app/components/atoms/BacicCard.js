import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { basicCardStyles as styles } from './styles';

const BasicCard = ({ classes, renderIcon }) => {
  return <div className={classes.root} />;
};

BasicCard.propTypes = {
  title: PropTypes.string.isRequired,
  renderIcon: PropTypes.func
};

export default withStyles(styles)(BasicCard);
