import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { objectOf, string, func, bool, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VersionsIcon from '@material-ui/icons/LabelOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Transition } from 'components/common';
import { iMessage, showDialog } from 'commons/utils';
import PackageVersions from 'components/packages/details/PackageVersions';
import PackageInfo from 'components/packages/details/PackageInfo';
import InstallationOptions from 'components/packages/options/InstallationOptions';
import { installPackage } from 'models/packages/actions';
import { setActiveNotification } from 'models/notifications/actions';

import styles from './styles';

const NotificationDetails = ({ classes, active, mode }) => {
  const { name, version, license, description, versions } = active;
  const dispatch = useDispatch();
  const [expanded, expand] = useState(true);
  const [dependencies, setDependencies] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [activePopper, setActivePopper] = useState({
    index: 0,
    anchorEl: null,
    open: false,
  });

  const handleInstallVersion = (packageVersion) => {
    if (mode === 'local') {
      return setDialogOpen(true);
    }

    const dialogOptions = {
      title: 'Confirmation',
      type: 'question',
      message: iMessage('confirmation', 'installVersion', {
        '%version%': packageVersion,
        '%name%': name,
      }),
      buttons: ['Cancel', 'Install'],
    };

    const dialogHandler = ({ response }) => {
      if (response === 0) {
        return;
      }

      dispatch(
        installPackage({
          cmd: ['install'],
          name,
          version: packageVersion,
          single: true,
        })
      );
    };

    return showDialog(dialogHandler, dialogOptions);
  };

  const clearNotification = () =>
    dispatch(setActiveNotification({ active: null }));

  useEffect(() => {
    if (active && active.dependencies) {
      const dependenciesNames = Object.keys(active.dependencies);
      const dependenciesToArray = dependenciesNames.map((dep) => ({
        name: dep,
        version: active.dependencies[dep],
      }));

      setDependencies(dependenciesToArray);
    }
  }, [active]);

  return (
    <>
      <Grid container justify="space-around">
        <Grid item md={10} lg={10} xl={10}>
          <Transition>
            <Card>
              <CardHeader
                title={
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >{`${name} v${version}`}</Typography>
                }
                classes={{
                  root: classes.cardHeader,
                  subheader: classes.subheader,
                }}
                subheader={
                  <>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                    >{`License: ${license || 'N/A'}`}</Typography>
                  </>
                }
              />
              <CardContent classes={{ root: classes.cardContent }}>
                <Typography color="textSecondary" variant="body2">
                  {description}
                </Typography>
                <Divider className={classes.divider} />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <PackageInfo active={active} dependencies={dependencies} />
                </Collapse>
              </CardContent>
              <CardActions>
                <IconButton
                  disableRipple
                  className={cn(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={() => expand(!expanded)}
                  aria-expanded={expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Transition>
        </Grid>

        <Grid item md={1} lg={1} xl={1}>
          <Toolbar
            disableGutters
            variant="dense"
            classes={{
              root: classes.toolbar,
            }}
          >
            <Tooltip title={iMessage('title', 'clearActive')}>
              <div>
                <IconButton
                  color="secondary"
                  disableRipple
                  onClick={clearNotification}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip title={iMessage('title', 'packageVersions')}>
              <div>
                <IconButton
                  color="primary"
                  disableRipple
                  onClick={(e) =>
                    setActivePopper({
                      index: activePopper.index === 1 ? 0 : 1,
                      anchorEl: e.currentTarget,
                      open: activePopper.index !== 1,
                    })
                  }
                >
                  <VersionsIcon />
                </IconButton>
              </div>
            </Tooltip>
          </Toolbar>
        </Grid>
      </Grid>

      <Popper
        open={activePopper.index === 1}
        anchorEl={activePopper.index === 1 ? activePopper.anchorEl : null}
        placement="left-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            <PackageVersions
              versions={versions}
              handleInstall={handleInstallVersion}
            />
          </Fade>
        )}
      </Popper>

      <InstallationOptions
        isOpen={isDialogOpen}
        selected={[name]}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

NotificationDetails.propTypes = {
  classes: objectOf(string).isRequired,
  active: object,
};

export default withStyles(styles)(NotificationDetails);
