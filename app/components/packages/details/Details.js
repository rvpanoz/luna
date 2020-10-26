import React from 'react';
import semver from 'semver';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { always, cond, equals } from 'ramda';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { objectOf, string, func, bool } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import VersionsIcon from '@material-ui/icons/LabelOutlined';
import DependenciesIcon from '@material-ui/icons/ListOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  updatePackages,
  installPackage,
  uninstallPackages,
  setActive,
} from 'models/packages/actions';
import { Transition } from 'components/common';
import { iMessage, showDialog, switchcase } from 'commons/utils';
import Dependencies from '../Dependencies';
import Versions from '../Versions';
import PackageInfo from '../PackageInfo';
import { InstallAction, UpdateAction, UninstallAction } from '../Actions';
import { initialDialogOptions } from 'components/packages/Packages';
import styles from './styles';

const mapState = ({
  common: { mode },
  ui: {
    loaders: { packageLoader },
  },
  packages: {
    active,
    packagesData,
    packagesOutdated,
    metadata: { fromSearch },
  },
}) => ({
  active,
  mode,
  packagesData,
  packageLoader,
  packagesOutdated,
  fromSearch,
});

const PackageDetails = ({ classes, showInstallationOptions }) => {
  const dispatch = useDispatch();
  const [expanded, expand] = useState(true);
  const [dependencies, setDependencies] = useState([]);
  const [activePopper, setActivePopper] = useState({
    index: 0,
    anchorEl: null,
    open: false,
  });

  const {
    active,
    packageLoader,
    mode,
    fromSearch,
    packagesData,
  } = useMappedState(mapState);

  const versions = active && active.versions ? active.versions : [];
  const { name, version, description } = active || {};
  let group = null;

  const activeGroup =
    mode === 'local' && active
      ? packagesData.find((pkg) => pkg.name === name)
      : null;

  if (activeGroup && activeGroup.__group) {
    group = activeGroup.__group;
  }

  const handleInstall = () => {
    if (fromSearch && mode === 'local') {
      return showInstallationOptions({
        single: true,
        name: active.name,
        version,
        ...initialDialogOptions,
      });
    }

    dispatch(
      installPackage({
        ipcEvent: 'npm-install',
        cmd: ['install'],
        name: active.name,
        version: 'latest',
        single: true,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      updatePackages({
        ipcEvent: 'npm-update',
        cmd: ['update'],
        multiple: true,
        packages: [active.name],
      })
    );
  };

  const handleUninstall = () => {
    dispatch(
      uninstallPackages({
        ipcEvent: 'npm-uninstall',
        cmd: ['uninstall'],
        multiple: true,
        packages: [active.name],
      })
    );
  };

  const handleInstallVersion = (packageVersion) => {
    if (fromSearch && mode === 'local') {
      return showInstallationOptions({
        single: true,
        name: active.name,
        version: packageVersion,
      });
    }

    const dialogOptions = {
      title: 'Confirmation',
      type: 'question',
      message: iMessage('confirmation', 'installVersion', {
        '%version%': packageVersion,
        '%name%': active.name,
      }),
      buttons: ['Cancel', 'Install'],
    };

    const options = switchcase({
      dependencies: () => ['save-prod'],
      devDependencies: () => ['save-dev'],
      optionalDependencies: () => ['save-optional'],
    })('')(group);

    const dialogHandler = ({ response }) => {
      if (response === 0) {
        return;
      }

      dispatch(
        installPackage({
          cmd: ['install'],
          name: active.name,
          pkgOptions: options,
          version: packageVersion,
          single: true,
        })
      );
    };

    return showDialog(dialogHandler, dialogOptions);
  };

  const renderActions = () => {
    const renderOperationActions = () => {
      const latestVersion = active && active['dist-tags'].latest;
      const isOutdated = latestVersion
        ? semver.gt(latestVersion, version)
        : false;

      return (
        <>
          {isOutdated && (
            <UpdateAction packageName={active.name} handler={handleUpdate} />
          )}
          <UninstallAction
            packageName={active.name}
            handler={handleUninstall}
          />
        </>
      );
    };

    return (
      <CardActions className={classes.actions}>
        {cond([
          [equals(false), always(renderOperationActions())],
          [
            equals(true),
            always(
              <InstallAction
                packageName={active.name}
                handler={handleInstall}
              />
            ),
          ],
        ])(Boolean(fromSearch))}
        <Hidden mdDown>
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
        </Hidden>
      </CardActions>
    );
  };

  const renderCard = () => (
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
                    variant="body2"
                  >{`License: ${active.license || '-'}`}</Typography>
                  {mode === 'local' && !fromSearch && (
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >{`Group: ${group || '-'}`}</Typography>
                  )}
                </>
              }
            />
            <CardContent classes={{ root: classes.cardContent }}>
              <Typography variant="body1">{description}</Typography>
              <Divider className={classes.divider} />
              <Hidden mdDown>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <PackageInfo active={active} dependencies={dependencies} />
                </Collapse>
              </Hidden>
            </CardContent>
            {renderActions(name, fromSearch)}
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
                onClick={() => {
                  setActivePopper({
                    index: 0,
                    anchorEl: null,
                    open: false,
                  });
                  dispatch(setActive({ active: null }));
                }}
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
          <Tooltip title={iMessage('title', 'packageDependencies')}>
            <div>
              <IconButton
                color="primary"
                disableRipple
                onClick={(e) =>
                  setActivePopper({
                    index: activePopper.index === 2 ? 0 : 2,
                    anchorEl: e.currentTarget,
                    open: activePopper.index !== 2,
                  })
                }
              >
                <DependenciesIcon />
              </IconButton>
            </div>
          </Tooltip>
        </Toolbar>
      </Grid>
    </Grid>
  );

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
    <div className={classes.wrapper}>
      <Loader
        loading={packageLoader.loading}
        message={iMessage('info', 'loadingPackage')}
        relative
      >
        {active ? renderCard() : null}
      </Loader>
      <Popper
        open={activePopper.index === 1}
        anchorEl={activePopper.index === 1 ? activePopper.anchorEl : null}
        placement="left-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            <Versions data={versions} handleInstall={handleInstallVersion} />
          </Fade>
        )}
      </Popper>
      <Popper
        open={activePopper.index === 2}
        anchorEl={activePopper.index === 2 ? activePopper.anchorEl : null}
        placement="left-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            <Dependencies data={dependencies} />
          </Fade>
        )}
      </Popper>
    </div>
  );
};

PackageDetails.defaultProps = {
  group: null,
};

PackageDetails.propTypes = {
  classes: objectOf(string).isRequired,
  showInstallationOptions: func.isRequired,
  group: string,
};

export default withStyles(styles)(PackageDetails);
