/* eslint-disable no-underscore-dangle */

import { remote } from 'electron';
import React, { useEffect, useState } from 'react';
import { always, cond, equals } from 'ramda';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { objectOf, string } from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import VersionsIcon from '@material-ui/icons/LabelOutlined';
import DependenciesIcon from '@material-ui/icons/ListOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { PACKAGE_GROUPS } from 'constants/AppConstants';
import { isPackageOutdated } from 'commons/utils';
import {
  updatePackages,
  installPackage,
  setActive
} from 'models/packages/actions';
import AppLoader from 'components/common/AppLoader';
import Transition from 'components/common/Transition';

import PackageInfo from './PackageInfo';
import styles from './styles/packageDetails';

const mapState = ({
  common: { mode, directory },
  ui: {
    loaders: { packageLoader }
  },
  packages: {
    active,
    packagesData,
    packagesOutdated,
    metadata: { fromSearch }
  }
}) => ({
  active,
  mode,
  directory,
  packagesData,
  packageLoader,
  packagesOutdated,
  fromSearch
});

const PackageDetails = ({ classes }) => {
  const [expanded, expand] = useState(false);
  const [dependencies, setDependencies] = useState([]);
  const [activePopper, setActivePopper] = useState({
    index: 0,
    anchorEl: null,
    open: false
  });

  const dispatch = useDispatch();
  const {
    active,
    packageLoader,
    mode,
    directory,
    fromSearch,
    packagesData,
    packagesOutdated
  } = useMappedState(mapState);
  const { name, version, description } = active || {};
  let group = null;

  const activeGroup =
    mode === 'local' && active
      ? packagesData.find(pkg => pkg.name === name)
      : null;

  if (activeGroup && activeGroup.__group) {
    group = activeGroup.__group;
  }

  useEffect(() => {
    if (!active) {
      return;
    }

    if (active.dependencies) {
      const dependenciesNames = Object.keys(active.dependencies);

      const dependenciesToArray = dependenciesNames.map(dep => ({
        name: dep,
        version: active.dependencies[dep]
      }));

      setDependencies(dependenciesToArray);
    }
  }, [active]);

  const renderActions = () => {
    const renderSearchActions = () => (
      <Tooltip title="Install">
        <div>
          <IconButton
            disableRipple
            color="primary"
            onClick={() =>
              remote.dialog.showMessageBox(
                remote.getCurrentWindow(),
                {
                  title: 'Confirmation',
                  type: 'question',
                  message: `\nDo you want to install ${active.name}?`,
                  buttons: ['Cancel', 'Install']
                },
                btnIdx => {
                  if (Boolean(btnIdx) === true) {
                    const pkgOptions = group
                      ? [PACKAGE_GROUPS[group]]
                      : ['save-prod'];

                    dispatch(installPackage({
                      cmd: ['install'],
                      name,
                      pkgOptions,
                      single: true
                    }));
                  }
                }
              )
            }
          >
            <AddIcon />
          </IconButton>
        </div>
      </Tooltip>
    );

    const renderOperationActions = () => {
      const isOutdated = active
        ? isPackageOutdated(packagesOutdated, active.name)[0]
        : false;

      return (
        <React.Fragment>
          {isOutdated && (
            <React.Fragment>
              <Tooltip title="Update to latest">
                <div>
                  <IconButton
                    disableRipple
                    color="primary"
                    onClick={() =>
                      remote.dialog.showMessageBox(
                        remote.getCurrentWindow(),
                        {
                          title: 'Confirmation',
                          type: 'question',
                          message: `\nDo you want to install ${
                            active.name
                            } latest version?`,
                          buttons: ['Cancel', 'Install']
                        },
                        btnIdx => {
                          if (Boolean(btnIdx) === true) {
                            dispatch(installPackage({
                              cmd: ['install'],
                              name,
                              version: 'latest',
                              single: true,
                              pkgOptions: [],
                            }));
                          }
                        }
                      )
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip title="Update">
                <div>
                  <IconButton
                    disableRipple
                    color="primary"
                    onClick={() =>
                      remote.dialog.showMessageBox(
                        remote.getCurrentWindow(),
                        {
                          title: 'Confirmation',
                          type: 'question',
                          message: `\nDo you want to update ${active.name}?`,
                          buttons: ['Cancel', 'Update']
                        },
                        btnIdx => {
                          if (Boolean(btnIdx) === true) {
                            dispatch(
                              updatePackages({
                                ipcEvent: 'update',
                                cmd: ['update'],
                                name: active.name,
                                mode,
                                directory
                              })
                            );
                          }
                        }
                      )
                    }
                  >
                    <UpdateIcon />
                  </IconButton>
                </div>
              </Tooltip>
            </React.Fragment>
          )}
          <Tooltip title="Remove">
            <div>
              <IconButton
                disabled={Boolean(active && active.name === 'npm')}
                disableRipple
                color="secondary"
                onClick={() =>
                  remote.dialog.showMessageBox(
                    remote.getCurrentWindow(),
                    {
                      title: 'Confirmation',
                      type: 'question',
                      message: `\nDo you want to uninstall ${active.name}?`,
                      buttons: ['Cancel', 'Uninstall']
                    },
                    btnIdx => {
                      if (Boolean(btnIdx) === true) {
                        dispatch(
                          updatePackages({
                            ipcEvent: 'uninstall',
                            cmd: ['uninstall'],
                            name: active.name,
                            mode,
                            directory
                          })
                        );
                      }
                    }
                  )
                }
              >
                <RemoveIcon />
              </IconButton>
            </div>
          </Tooltip>
        </React.Fragment>
      );
    };

    return (
      <CardActions className={classes.actions} disableActionSpacing>
        {cond([
          [equals(false), always(renderOperationActions())],
          [equals(true), always(renderSearchActions())]
        ])(Boolean(fromSearch))}
        <Hidden mdDown>
          <IconButton
            disableRipple
            className={cn(classes.expand, {
              [classes.expandOpen]: expanded
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

  const renderList = (type, data) => (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        {type === 'version' && (
          <Typography>{`Versions (${data.length})`}</Typography>
        )}
        {type === 'dependency' && (
          <Typography>{`Dependencies (${data.length})`}</Typography>
        )}
      </div>
      <Divider light />
      {data.length === 0 ? (
        <Typography className={classes.withPadding}>No data found</Typography>
      ) : (
          <List
            dense
            style={{ overflowY: 'scroll', minWidth: 225, maxHeight: 425 }}
          >
            {data.map((item, idx) => (
              <ListItem
                key={`${type}-item-${idx + 1}`}
                className={classes.listItem}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">
                      {type === 'version' ? item : item.name}
                    </Typography>
                  }
                  secondary={
                    type === 'dependency' && (
                      <Typography variant="subtitle2">{item.version}</Typography>
                    )
                  }
                />
                {type === 'version' && (
                  <Tooltip title={`Install version ${item}`}>
                    <div>
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="install_version"
                          onClick={() => {
                            remote.dialog.showMessageBox(
                              remote.getCurrentWindow(),
                              {
                                title: 'Confirmation',
                                type: 'question',
                                message: `\nWould you like to install ${
                                  active.name
                                  }@${item}?`,
                                buttons: ['Cancel', 'Install']
                              },
                              btnIdx => {
                                if (Boolean(btnIdx) === true) {
                                  const pkgOptions = group
                                    ? [PACKAGE_GROUPS[group]]
                                    : ['save-prod'];

                                  const parameters = {
                                    ipcEvent: 'install',
                                    cmd: ['install'],
                                    name,
                                    version: item,
                                    pkgOptions,
                                    single: true,
                                    mode,
                                    directory
                                  };

                                  dispatch(installPackage(parameters));
                                }
                              }
                            );
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </div>
                  </Tooltip>
                )}
              </ListItem>
            ))}
          </List>
        )}
    </Paper>
  );

  const renderCard = () => (
    <Grid container justify="space-around">
      <Grid item md={10} lg={10} xl={10}>
        <Transition>
          <Card className={classes.card}>
            <CardHeader
              title={
                <Typography variant="h6">{`${name} v${version ||
                  '0.0.0'}`}</Typography>
              }
              className={classes.cardHeader}
              subheader={
                <React.Fragment>
                  <Typography variant="caption">{`License: ${active.license ||
                    'N/A'}`}</Typography>
                  {mode === 'local' && !fromSearch && (
                    <Typography variant="caption">{`Group: ${group ||
                      'N/A'}`}</Typography>
                  )}
                </React.Fragment>
              }
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="body1">{description}</Typography>
              <Divider className={classes.divider} light />
              <Hidden mdDown>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <PackageInfo active={active} dependencies={dependencies} />
                </Collapse>
              </Hidden>
              <Hidden lgUp>
                <PackageInfo active={active} short />
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
            root: classes.toolbar
          }}
        >
          <Tooltip title="Clear active package">
            <IconButton
              color="secondary"
              disableRipple
              onClick={() => {
                setActivePopper({
                  index: 0,
                  anchorEl: null,
                  open: false
                });
                dispatch(setActive({ active: null }));
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Package versions">
            <IconButton
              color="primary"
              disableRipple
              onClick={e =>
                setActivePopper({
                  index: activePopper.index === 1 ? 0 : 1,
                  anchorEl: e.currentTarget,
                  open: activePopper.index !== 1
                })
              }
            >
              <VersionsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Package dependencies">
            <IconButton
              color="primary"
              disableRipple
              onClick={e =>
                setActivePopper({
                  index: activePopper.index === 2 ? 0 : 2,
                  anchorEl: e.currentTarget,
                  open: activePopper.index !== 2
                })
              }
            >
              <DependenciesIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Grid>
    </Grid>
  );

  return (
    <div className={classes.wrapper}>
      <AppLoader loading={packageLoader.loading} relative mini>
        {active ? renderCard() : null}
      </AppLoader>
      <Popper
        open={activePopper.index === 1}
        anchorEl={activePopper.index === 1 ? activePopper.anchorEl : null}
        placement="left-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            {renderList('version', (active && active.versions) || [])}
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
            {renderList('dependency', dependencies)}
          </Fade>
        )}
      </Popper>
    </div>
  );
};

PackageDetails.defaultProps = {
  group: null
};

PackageDetails.propTypes = {
  classes: objectOf(string).isRequired,
  group: string
};

export default withStyles(styles)(PackageDetails);
