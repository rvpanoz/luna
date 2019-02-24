/**
 * Package details
 */

/* eslint-disable */

import React, { useEffect, useCallback, useState } from 'react';
import { ipcRenderer } from 'electron';
import { always, cond, equals, pickBy } from 'ramda';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { objectOf, string } from 'prop-types';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import UpdateIcon from '@material-ui/icons/Update';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fade from '@material-ui/core/Fade';

import { togglePackageLoader } from 'models/ui/actions';
import { setActive } from 'models/packages/actions';
import { APP_MODES, APP_INFO } from 'constants/AppConstants';

import AppLoader from 'components/common/AppLoader';
import Transition from 'components/common/Transition';

import PackageInfo from './PackageInfo';
import styles from './styles/packageDetails';

const getCleanProps = (val, key) => /^[^_]/.test(key);

const mapState = ({
  common: { mode, packageLoader },
  repository: {
    data: { packages },
    active,
    metadata: { fromSearch }
  }
}) => ({
  active,
  mode,
  packageLoader,
  packages,
  fromSearch
});

const PackageDetails = ({ classes }) => {
  const [license, setLicense] = useState(APP_INFO.NOT_AVAILABLE);
  const [group, setGroup] = useState('global');
  const [expanded, expand] = useState(false);
  const [popperInfo, togglePopperInfo] = useState({
    anchorEl: null,
    open: false
  });

  const dispatch = useDispatch();
  const { active, packageLoader, mode, packages, fromSearch } = useMappedState(
    mapState
  );
  const { name, version, description } = active || {};

  const findPackageByName = useCallback(
    name => (packages && packages.filter(pkg => pkg.name === name)[0]) || null,
    [active]
  );

  useEffect(() => {
    const pkg = findPackageByName(name);

    if (!pkg || typeof pkg !== 'object') {
      return;
    }

    if (mode === APP_MODES.LOCAL && active) {
      setGroup(pkg.__group);
    }

    setLicense(pkg.license || APP_INFO.NOT_AVAILABLE);
  }, [name]);

  const renderSearchActions = () => (
    <Tooltip title="install">
      <IconButton disableRipple onClick={e => console.log(e)}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );

  const renderInstalledActions = () => (
    <React.Fragment>
      <Tooltip title="install">
        <IconButton disableRipple onClick={e => console.log(e)}>
          <UpdateIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="remove">
        <IconButton disableRipple onClick={e => console.log(e)}>
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
          [equals(false), always(renderInstalledActions())],
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
  }, [fromSearch]);

  useEffect(() => {
    ipcRenderer.on(['view-close'], (event, status, cmd, data) => {
      try {
        const newActive = data && JSON.parse(data);
        const properties = pickBy(getCleanProps, newActive); //remove __property name

        dispatch(setActive({ active: properties }));
        dispatch(
          togglePackageLoader({
            loading: false
          })
        );
      } catch (err) {
        throw new Error(err);
      }
    });

    return () => ipcRenderer.removeAllListeners(['view-package-close']);
  }, []);

  const renderCard = useCallback(() => (
    <Grid container justify="space-around">
      <Grid item xs={11} md={10} lg={10} xl={10}>
        <Transition>
          <Card className={classes.card}>
            <CardHeader
              action={
                <Chip
                  label={`in ${group}`}
                  className={cn(classes.chip, {
                    [classes[`${group}Chip`]]: Boolean(group)
                  })}
                />
              }
              title={name}
              subheader={`v${version}`}
            />
            <CardContent>
              <Typography component="p">{description}</Typography>
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
          <Tooltip title="View details">
            <IconButton
              disableRipple
              onClick={e =>
                togglePopperInfo({
                  anchorEl: popperInfo.anchorEl ? null : e.currentTarget,
                  open: !popperInfo.open
                })
              }
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Grid>
    </Grid>
  ));

  return (
    <div className={classes.wrapper}>
      <AppLoader loading={packageLoader.loading} relative>
        {active ? renderCard() : null}
      </AppLoader>
      <Popper
        open={popperInfo.open}
        anchorEl={popperInfo.anchorEl}
        placement="left-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <PackageInfo license={license} {...active} />
            </Paper>
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
