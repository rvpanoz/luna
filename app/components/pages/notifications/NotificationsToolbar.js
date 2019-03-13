import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';
import cn from 'classnames';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InstallIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import { defaultFont, flexContainer } from 'styles/variables';

const toolbarStyles = theme => ({
  root: {
    width: '100%'
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    ...flexContainer,
    alignItems: 'center',
    flex: '0 0 auto',
    padding: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto',
    padding: theme.spacing.unit * 2 + 4
  },
  directory: {
    ...defaultFont,
    fontSize: 12
  },
  highlight: {
    color: darken(theme.palette.common.white, 0.1),
    backgroundColor: lighten(theme.palette.secondary.light, 0.9)
  }
});

const NotificationsToolbar = ({
  numSelected,
  total,
  classes,
  handleInstall
}) => (
  <Toolbar
    disableGutters
    className={cn(classes.root, {
      [classes.highlight]: numSelected > 0
    })}
  >
    <div className={classes.title}>
      {numSelected > 0 ? (
        <Typography variant="subtitle1">{numSelected} selected</Typography>
      ) : (
        <Typography variant="subtitle1">{`Problems ${total}`}</Typography>
      )}
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>
      {numSelected > 0 ? (
        <Tooltip title="Install">
          <IconButton aria-label="install_peer" onClick={handleInstall}>
            <InstallIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </div>
  </Toolbar>
);

NotificationsToolbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  numSelected: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  handleInstall: PropTypes.func.isRequired
};

export default withStyles(toolbarStyles)(NotificationsToolbar);
