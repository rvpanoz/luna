import React from 'react';
import cn from 'classnames';
import { string, func, bool, objectOf } from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import AppButton from '../button/Button';
import styles from './styles';

const HelperText = ({
  classes,
  text,
  detail,
  actionText,
  actionHandler,
  actionDisabled,
}) => (
  <div className={classes.container}>
    <Typography
      color="textSecondary"
      variant="subtitle1"
      className={cn(classes.noData, classes.withPadding)}
    >
      {text}
    </Typography>
    {detail && (
      <Typography variant="body2" className={classes.withPadding}>
        {detail}
      </Typography>
    )}
    {actionText && actionHandler ? (
      <AppButton
        disabled={actionDisabled}
        color="simple"
        className={classes.button}
        onClick={actionHandler}
      >
        {actionText}
      </AppButton>
    ) : null}
  </div>
);

HelperText.propTypes = {
  classes: objectOf(string).isRequired,
  color: string,
  text: string,
  detail: string,
  actionText: string,
  actionHandler: func,
  actionDisabled: bool,
};

export default withStyles(styles)(HelperText);
