import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { iMessage } from 'commons/utils';
import styles from './styles/navigationBar';

const NavigationBar = ({
  classes,
  mode,
  directory,
  env,
  activePage,
  setActivePage
}) => (
    <div className={classes.root}>
      <Tooltip title={iMessage('info', 'backToPackages')}>
        <div>
          <IconButton
            classes={{
              root: classes.button
            }}
            disableRipple
            disabled={activePage === 'packages'}
            onClick={() => setActivePage('packages')}
          >
            <ArrowBackIcon className={classes.icon} />
          </IconButton>
        </div>
      </Tooltip>
      <div className={cn(classes.flexContainer, classes.padTop)}>
        <Typography variant="subtitle1" component="div" color="textSecondary">
          {mode === 'local'
            ? iMessage('info', 'workingDirectory')
            : iMessage('info', 'showingGlobals')}
        </Typography>
        <Typography variant="subtitle2" component="div" color="textSecondary">
          {mode === 'local' ? directory : env.prefix}
        </Typography>
      </div>
    </div>
  );

NavigationBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string.isRequired,
  directory: PropTypes.string,
  activePage: PropTypes.string,
  setActivePage: PropTypes.func,
  env: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string)
  ])
};

export default withStyles(styles)(NavigationBar);
