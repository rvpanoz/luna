/**
 * Package details
 */

import React, { useEffect, useCallback, useState } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, string } from 'prop-types';
import cn from 'classnames';
import AppLoader from 'components/layout/AppLoader';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { onSetActive } from 'models/packages/selectors';

import Transition from 'components/layout/Transition';
import styles from '../styles/packageDetails';

const mapState = ({ common: { packageLoader }, packages: { active } }) => ({
  active,
  packageLoader
});

const PackageDetails = props => {
  const { classes } = props;
  const [expanded, expand] = useState(false);
  const { active, packageLoader } = useMappedState(mapState);
  const dispatch = useDispatch();

  const renderActions = () => (
    <CardActions className={classes.actions} disableActionSpacing>
      <IconButton aria-label="Add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="Share">
        <ShareIcon />
      </IconButton>
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

        onSetActive(dispatch, { active: newActive });
      } catch (err) {
        throw new Error(err);
      }
    });

    return () => ipcRenderer.removeAllListeners(['view-package-close']);
  }, []);

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
            <Toolbar
              variant="dense"
              classes={{
                root: classes.toolbar
              }}
            >
              <Transition type="Slide">
                <Tooltip title="update">
                  <IconButton disableRipple onClick={e => console.log(e)}>
                    <HistoryIcon />
                  </IconButton>
                </Tooltip>
              </Transition>
              <Transition type="Slide">
                <Tooltip title="install">
                  <IconButton disableRipple onClick={e => console.log(e)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Transition>
              <Transition type="Slide">
                <Tooltip title="remove">
                  <IconButton disableRipple onClick={e => console.log(e)}>
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
              </Transition>
            </Toolbar>
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
    </div>
  );
};

PackageDetails.propTypes = {
  classes: objectOf(string).isRequired
};

export default withStyles(styles)(PackageDetails);
