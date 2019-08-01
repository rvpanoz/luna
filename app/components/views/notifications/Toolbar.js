import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import { iMessage } from 'commons/utils';
import styles from './styles/toolbar';

const ToolbarView = ({ classes, total, title, selected, handleInstall }) => {
  const hasNotificationsSelected = selected && selected.length > 0;

  return (
    <div className={classes.root}>
      <Toolbar
        disableGutters
        className={cn({
          [classes.highlight]:
            hasNotificationsSelected && hasNotificationsSelected.length
        })}
      >
        <div className={classes.header}>
          <Typography variant="h4" className={classes.title}>
            {!hasNotificationsSelected
              ? `${title} ${total}`
              : `${selected.length} notification(s) selected`}
          </Typography>
          .,
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title={iMessage('title', 'installSelected')}>
            <div>
              <IconButton
                disabled={!selected.length}
                disableRipple
                aria-label="install-package"
                onClick={handleInstall}
              >
                <AddIcon />
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </Toolbar>
    </div>
  );
};

ToolbarView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  handleInstall: PropTypes.func.isRequired,
  total: PropTypes.number
};

export default withStyles(styles)(ToolbarView);
