import React from 'react';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { useMappedState, useDispatch } from 'redux-react-hook';
import PropTypes, { objectOf, string } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InfoIcon from '@material-ui/icons/Info';
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
  packages: { project },
}) => ({
  activePage,
  mode,
  directory,
  npmEnv,
  loading,
  project,
});

const Navigation = ({ classes, className }) => {
  const { npmEnv, mode, directory, activePage, project } = useMappedState(
    mapState
  );
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
              disableRipple
              disabled={activePage === 'packages'}
              onClick={() => setActivePageHandler('packages')}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
        </Tooltip>
        <div className={classes.flex}>
          <Typography variant="subtitle1" component="div" color="textSecondary">
            {mode === 'local'
              ? iMessage('info', 'workingDirectory')
              : iMessage('info', 'showingGlobals')}
          </Typography>
          <Typography variant="subtitle2" component="div" color="textSecondary">
            {mode === 'local' ? directory : npmEnv ? npmEnv.prefix : null}
          </Typography>
        </div>
        <div className={classes.project}>
          <Typography variant="subtitle2" component="div" color="textSecondary">
            {mode === 'local' && project.name && project.version ? (
              <Chip
                avatar={
                  <Avatar>
                    <InfoIcon />
                  </Avatar>
                }
                color="secondary"
                label={`${project.name} - ${project.version}`}
              />
            ) : (
              <Chip
                avatar={
                  <Avatar>
                    <InfoIcon />
                  </Avatar>
                }
                color="secondary"
                label="Global packages"
              />
            )}
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
