import React from 'react';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { useMappedState, useDispatch } from 'redux-react-hook';
import PropTypes, { objectOf, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { iMessage } from 'commons/utils';
import { setActivePage } from 'models/ui/actions';
import styles from './styles';

const mapState = ({
  common: { mode, directory },
  ui: {
    activePage,
    loaders: {
      loader: { loading },
    },
  },
  npm: { env: npmEnv },
}) => ({
  activePage,
  mode,
  directory,
  npmEnv,
  loading,
});

const Navigation = ({ classes, className }) => {
  const { npmEnv, mode, directory, activePage } = useMappedState(mapState);
  const dispatch = useDispatch();

  const setActivePageHandler = (page) =>
    dispatch(
      setActivePage({
        page,
        paused: true,
      })
    );

  return (
    <div
      className={cn(classes.root, {
        [className]: className !== undefined,
      })}
    >
      <div className={classes.bar}>
        <Tooltip title={iMessage('info', 'backToPackages')}>
          <div>
            <IconButton
              classes={{
                root: classes.button,
              }}
              disableRipple
              disabled={activePage === 'packages'}
              onClick={() => setActivePageHandler('packages')}
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
            {mode === 'local' ? directory : npmEnv ? npmEnv.prefix : null}
          </Typography>
        </div>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  classes: objectOf(string).isRequired,
  className: string,
};

export default withStyles(styles)(Navigation);
