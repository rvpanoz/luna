/**
 * Package details
 */

import React, { useEffect, useCallback, useState } from 'react';
import { ipcRenderer } from 'electron';
import { pickBy } from 'ramda';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, string } from 'prop-types';
import cn from 'classnames';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import HistoryIcon from '@material-ui/icons/HistoryOutlined';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fade from '@material-ui/core/Fade';
import AppLoader from 'components/layout/AppLoader';
import Transition from 'components/layout/Transition';
import { onSetActive } from 'models/packages/selectors';
import styles from '../../styles/packageDetails';

const getCleanProps = (val, key) => /^[^_]/.test(key);

const mapState = ({ common: { packageLoader }, packages: { active } }) => ({
  active,
  packageLoader
});

const PackageDetails = ({ classes }) => {
  const [expanded, expand] = useState(false);
  const [popperInfo, togglePopperInfo] = useState({
    anchorEl: null,
    open: false
  });
  const { active, packageLoader } = useMappedState(mapState);
  const dispatch = useDispatch();

  const renderActions = () => (
    <CardActions className={classes.actions} disableActionSpacing>
      <Tooltip title="install">
        <IconButton disableRipple onClick={e => console.log(e)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="remove">
        <IconButton disableRipple onClick={e => console.log(e)}>
          <RemoveIcon />
        </IconButton>
      </Tooltip>
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

  useEffect(() => {
    ipcRenderer.on(['view-close'], (event, status, cmd, data) => {
      try {
        const newActive = data && JSON.parse(data);

        const properties = pickBy(getCleanProps, newActive);
        onSetActive(dispatch, { active: properties });
      } catch (err) {
        throw new Error(err);
      }
    });

    return () => ipcRenderer.removeAllListeners(['view-package-close']);
  }, []);

  const renderToolbar = useCallback(
    () => (
      <Toolbar
        variant="dense"
        classes={{
          root: classes.toolbar
        }}
      >
        <Transition type="Slide">
          <Tooltip title="info">
            <IconButton
              disableRipple
              onClick={e =>
                togglePopperInfo({
                  anchorEl: e.currentTarget,
                  open: !popperInfo.open
                })
              }
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Transition>
        <Transition type="Slide">
          <Tooltip title="update">
            <IconButton disableRipple onClick={e => console.log(e)}>
              <HistoryIcon />
            </IconButton>
          </Tooltip>
        </Transition>
      </Toolbar>
    ),
    [active]
  );

  const renderCard = useCallback(
    () => {
      const { name, license, version, description } = active || {};

      return (
        <Grid container justify="space-around">
          <Grid item xs={11} md={9} lg={9} xl={9}>
            <Transition>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      {license}
                    </Avatar>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={name}
                  subheader={version}
                />
                <CardContent>
                  <Typography component="p">{description}</Typography>
                </CardContent>
                {renderActions()}
              </Card>
            </Transition>
          </Grid>
          <Grid item xs={1} md={1} lg={1} xl={1}>
            {renderToolbar()}
          </Grid>
        </Grid>
      );
    },
    [active]
  );

  return (
    <div className={classes.wrapper}>
      <AppLoader loading={packageLoader.loading} relative>
        {active ? renderCard() : null}
      </AppLoader>
      <Popper
        open={popperInfo.open}
        anchorEl={popperInfo.anchorEl}
        placement="left"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography className={classes.typography}>
                The content of the Popper.
              </Typography>
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
