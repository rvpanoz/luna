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

const NotificationsToolbar = ({ classes, total, title }) => {
  return (
    <div className={classes.root}>
      <Toolbar
        disableGutters
        className={cn({
          [classes.highlight]: true,
        })}
      >
        <div className={classes.header}>
          <Typography variant="h4" className={classes.title}>
            {`${title} ${total}`}
          </Typography>
        </div>
      </Toolbar>
    </div>
  );
};

NotificationsToolbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
};

export default withStyles(styles)(NotificationsToolbar);
