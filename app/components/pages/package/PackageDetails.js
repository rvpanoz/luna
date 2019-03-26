/**
 * Package details
 */

/* eslint-disable */

import React, { useEffect, useCallback, useState } from 'react';
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
import RemoveIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import DependenciesIcon from '@material-ui/icons/List';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { updatePackages, installPackages } from 'models/packages/actions';
import { APP_INFO, PACKAGE_GROUPS } from 'constants/AppConstants';
import { isPackageOutdated } from 'commons/utils';

import AppLoader from 'components/common/AppLoader';
import Transition from 'components/common/Transition';

import styles from './styles/packageDetails';

const mapState = ({
  common: { mode, directory, packageLoader },
  modules: {
    data: { packages, packagesOutdated },
    active,
    metadata: { fromSearch }
  }
}) => ({
  active,
  mode,
  directory,
  packages,
  packageLoader,
  packagesOutdated,
  fromSearch
});

const PackageDetails = ({ classes }) => {
  const [license, setLicense] = useState(APP_INFO.NOT_AVAILABLE);
  const [group, setGroup] = useState('global');
  const [expanded, expand] = useState(false);
  const [isOutdated, setOutdated] = useState(false);
  const [versions, setVersions] = useState([]);
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
    packages,
    packagesOutdated
  } = useMappedState(mapState);
  const { name, version, description } = active || {};

  useEffect(() => {
    if (!active) {
      return;
    }

    const { name } = active;

    if (mode === 'local') {
      const group = packages.find(pkg => pkg.name === name).__group;
      setGroup(group);
    }

    const [newOutdated] = isPackageOutdated(packagesOutdated, name);
    setOutdated(newOutdated);

    if (active.license) {
      setLicense(active.license);
    }

    if (active.version) {
      setVersions(active.versions);
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

  const renderActions = useCallback(() => {
    const renderSearchActions = () => (
      <Tooltip title="install">
        <IconButton
          disableRipple
          onClick={e => {
            const pkgOptions =
              mode === 'local'
                ? group && [PACKAGE_GROUPS[group]]
                : ['save-prod'];

            const parameters = {
              ipcEvent: 'install',
              cmd: ['install'],
              name: active.name,
              pkgOptions: pkgOptions || [],
              single: true,
              mode,
              directory
            };

            dispatch(installPackages(parameters));
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    );

    const renderOparationActions = () => (
      <React.Fragment>
        {isOutdated && (
          <Tooltip title="Update">
            <IconButton
              disableRipple
              color="primary"
              onClick={e =>
                dispatch(
                  updatePackages({
                    ipcEvent: 'ipc-event',
                    cmd: ['update'],
                    name: active.name,
                    mode,
                    directory
                  })
                )
              }
            >
              <UpdateIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Remove">
          <IconButton
            disableRipple
            color="secondary"
            onClick={() =>
              dispatch(
                updatePackages({
                  ipcEvent: 'ipc-event',
                  cmd: ['uninstall'],
                  name: active.name,
                  mode,
                  directory
                })
              )
            }
          >
            <RemoveIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );

    return (
      <CardActions className={classes.actions} disableActionSpacing>
        {cond([
          [equals(false), always(renderOparationActions())],
          [equals(true), always(renderSearchActions())]
        ])(Boolean(fromSearch))}
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
      </CardActions>
    );
  }, [active, isOutdated, fromSearch, expanded]);

  const renderList = useCallback((type, data) => (
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
      <List
        dense={true}
        style={{ overflowY: 'scroll', minWidth: 225, maxHeight: 425 }}
      >
        {data.map((item, idx) => (
          <ListItem key={`${type}-item-${idx}`} className={classes.listItem}>
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
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="install_version"
                  onClick={e => {
                    const pkgOptions =
                      mode === 'local' ? [`--${PACKAGE_GROUPS[group]}`] : [];
                    const parameters = {
                      ipcEvent: 'install',
                      cmd: ['install'],
                      name: active.name,
                      version: item,
                      pkgOptions,
                      single: true,
                      mode,
                      directory
                    };

                    dispatch(installPackages(parameters));
                  }}
                >
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  ));

  const renderCard = useCallback(
    () => (
      <Grid container justify="space-around">
        <Grid item xs={11} md={10} lg={10} xl={10}>
          <Transition>
            <Card className={classes.card}>
              <CardHeader
                title={
                  <Typography variant="h6">{`${name} v${version}`}</Typography>
                }
                subheader={
                  <React.Fragment>
                    <Typography variant="caption">{`License: ${license}`}</Typography>
                    {mode === 'local' && (
                      <Typography variant="caption">{`Group: ${group}`}</Typography>
                    )}
                    <Divider className={classes.diveder} light />
                  </React.Fragment>
                }
              />
              <CardContent>
                <Typography variant="body1">{description}</Typography>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography>
                </Collapse>
              </CardContent>
              {renderActions(name, fromSearch)}
            </Card>
          </Transition>
        </Grid>
        <Grid item xs={1} md={1} lg={1} xl={1}>
          <Toolbar
            variant="dense"
            classes={{
              root: classes.toolbar
            }}
          >
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
                <UpdateIcon />
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
    ),
    [active, expanded, activePopper]
  );

  return (
    <div className={classes.wrapper}>
      <AppLoader
        loading={packageLoader.loading}
        message={packageLoader.message}
        relative
      >
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
            {renderList('version', versions)}
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

PackageDetails.propTypes = {
  classes: objectOf(string).isRequired
};

export default withStyles(styles)(PackageDetails);
