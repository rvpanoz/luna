import React from 'react';
import cn from 'classnames';
import { string, func, objectOf } from 'prop-types';
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import styles from './styles/helperText';

const HelperText = ({ classes, text, actionText, actionHandler }) => (
  <div className={classes.containerColumn}>
    <Typography
      variant="subtitle1"
      className={cn(classes.noData, classes.withPadding)}
    >
      {text}
    </Typography>
    {actionText && actionHandler && (
      <Button
        color="primary"
        className={classes.buttonFix}
        variant="outlined"
        onClick={actionHandler}
      >
        {actionText}
      </Button>
    )}
  </div>
);

HelperText.propTypes = {
  classes: objectOf(string).isRequired,
  text: string,
  actionText: string,
  actionHandler: func
};

export default withStyles(styles)(HelperText);
