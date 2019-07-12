import React from 'react';
import classnames from 'classnames';
import { Paper, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Widget = ({
  classes,
  children,
  title,
  noBodyPadding,
  bodyClass,
  className,
  disableWidgetMenu,
  ...props
}) => (
    <div className={classes.widgetWrapper}>
      <Paper className={classes.paper}>
        <div className={classes.widgetHeader}>
          {props.header ? (
            props.header
          ) : (
              <Typography variant="h6" color="textSecondary">
                {title}
              </Typography>
            )}
        </div>
        {title && <Divider light />}
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
  );

const styles = theme => ({
  widgetWrapper: {
    display: 'flex',
    minHeight: '100%'
  },
  widgetHeader: {
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  widgetBody: {
    paddingBottom: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3
  },
  noPadding: {
    padding: 0
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden'
  }
});

export default withStyles(styles, { withTheme: true })(Widget);
