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
import { APP_INFO } from 'constants/AppConstants';

import AppLoader from 'components/common/AppLoader';
import Transition from 'components/common/Transition';

import styles from './styles/packageDetails';

const mapState = ({
  common: { mode, directory, packageLoader },
  modules: {
    data: { packagesOutdated },
    active,
    metadata: { fromSearch }
  }
}) => ({
  active,
  mode,
  directory,
  packageLoader,
  packagesOutdated,
  fromSearch
});

const PackageDetails = ({ classes }) => {
  const [license, setLicense] = useState(APP_INFO.NOT_AVAILABLE);
  const [group, setGroup] = useState('global');
  const [expanded, expand] = useState(false);
  const [isOutdated, setOutdated] = useState(false);
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
    packagesOutdated
  } = useMappedState(mapState);
  const { name, version, description } = active || {};

  useEffect(() => {
    if (!active) {
      return;
    }

    const { name } = active;

    if (mode === 'local') {
      setGroup(active.__group);
    }

    const newOutdated =
      packagesOutdated &&
      packagesOutdated.find(pkgOutdated => pkgOutdated.name === name);

    setOutdated(Boolean(newOutdated));

    setLicense(active.license || APP_INFO.NOT_AVAILABLE);
  }, [active]);

  const renderSearchActions = () => (
    <Tooltip title="install">
      <IconButton
        disableRipple
        onClick={e => {
          const parameters = {
            ipcEvent: 'install',
            cmd: ['install'],
            name: active.name,
            pkgOptions: ['--save-prod'],
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

  const renderOparationActions = (active, isOutdated) => (
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

  const renderActions = useCallback(() => {
    const fromSearchBool = Boolean(fromSearch);

    return (
      <CardActions className={classes.actions} disableActionSpacing>
        {cond([
          [equals(false), always(renderOparationActions(active, isOutdated))],
          [equals(true), always(renderSearchActions())]
        ])(fromSearchBool)}
        <IconButton
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
  }, [active, isOutdated, fromSearch]);

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
                <IconButton aria-label="install_version">
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  ));

  const renderCard = useCallback(() => (
    <Grid container justify="space-around">
      <Grid item xs={11} md={10} lg={10} xl={10}>
        <Transition>
          <Card className={classes.card}>
            <CardHeader
              title={<Typography variant="subtitle1">{name}</Typography>}
              subheader={
                <React.Fragment>
                  <Typography variant="caption">{`v${version} - ${license}`}</Typography>
                  {mode === 'local' && (
                    <Typography variant="caption">{group}</Typography>
                  )}
                </React.Fragment>
              }
            />
            <CardContent>
              <Typography variant="body1">{description}</Typography>
              <Divider light />
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
                  index: 1,
                  anchorEl: e.currentTarget,
                  open: !activePopper.open
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
                  index: 2,
                  anchorEl: e.currentTarget,
                  open: !activePopper.open
                })
              }
            >
              <DependenciesIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Grid>
    </Grid>
  ));

  const activeDependencies = active && active.dependencies;
  let dependenciesToArray = [];

  if (activeDependencies) {
    const dependenciesNames = Object.keys(activeDependencies);

    dependenciesToArray = dependenciesNames.map(dep => ({
      name: dep,
      version: activeDependencies[dep]
    }));
  }

  return (
    <div className={classes.wrapper}>
      <AppLoader loading={packageLoader.loading} relative>
        {active ? renderCard() : null}
      </AppLoader>
      <Popper
        open={activePopper.index === 1 && activePopper.open}
        anchorEl={activePopper.index === 1 ? activePopper.anchorEl : null}
        placement="left-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            {renderList('version', active.versions)}
          </Fade>
        )}
      </Popper>
      <Popper
        open={activePopper.index === 2 && activePopper.open}
        anchorEl={activePopper.index === 2 ? activePopper.anchorEl : null}
        placement="left-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            {renderList('dependency', dependenciesToArray)}
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
