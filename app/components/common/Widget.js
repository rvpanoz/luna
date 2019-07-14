import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames';
import { withStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper'
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
}) => {
  const { header } = props;

  return <div className={classes.widgetWrapper}>
    <Paper className={classes.paper} elevation={2}>
      <div className={classes.widgetHeader}>
        {!header && title ? <Typography variant="h6" color="textSecondary">
          {title}
        </Typography> : header}
      </div>
      {title && <Divider light />}
      <div
        className={cn(classes.widgetBody, {
          [classes.noPadding]: noBodyPadding,
          [bodyClass]: bodyClass
        })}
      >
        {children}
      </div>
    </Paper>
  </div>
};

Widget.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  noBodyPadding: PropTypes.string,
  bodyClass: PropTypes.string,
  disableWidgetMenu: PropTypes.bool,
  header: PropTypes.node
}

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
    paddingLeft: theme.spacing.unit * 3,
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
