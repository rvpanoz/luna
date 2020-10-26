import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import styles from './styles';

const Widget = ({
  classes,
  children,
  title,
  noBodyPadding,
  bodyClass,
  className,
  disableWidgetMenu,
  ...props
}) => {
  const { header } = props;

  return (
    <div className={classes.widgetWrapper}>
      <Paper className={classes.paper} elevation={2}>
        <div className={classes.widgetHeader}>
          {!header && title ? (
            <>
              <Typography variant="h4" color="textSecondary">
                {title}
              </Typography>
            </>
          ) : (
            header
          )}
        </div>
        {title && <Divider />}
        <div
          className={cn(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
  );
};

Widget.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  noBodyPadding: PropTypes.bool,
  bodyClass: PropTypes.string,
  disableWidgetMenu: PropTypes.bool,
  header: PropTypes.node,
};

export default withStyles(styles, { withTheme: true })(Widget);
