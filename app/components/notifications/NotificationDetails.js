import React from 'react';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { objectOf, string, func, bool, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VersionsIcon from '@material-ui/icons/LabelOutlined';
import DependenciesIcon from '@material-ui/icons/ListOutlined';

import { AppLoader, Transition } from 'components/common';
import { iMessage } from 'commons/utils';
import styles from './styles/notifications';

const NotificationDetails = ({ classes, active }) => {
  if (!active) {
    return null;
  }

  const { name, version, license, description } = active;

  return (
    <Grid container justify="space-around">
      <Grid item md={10} lg={10} xl={10}>
        <Transition>
          <Card className={classes.card}>
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
                  >{`License: ${license || '-'}`}</Typography>
                </>
              }
            />
            <CardContent classes={{ root: classes.cardContent }}>
              <Typography variant="body1">{description}</Typography>
            </CardContent>
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
              <IconButton color="secondary" disableRipple onClick={() => {}}>
                <CloseIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title={iMessage('title', 'packageVersions')}>
            <div>
              <IconButton color="primary" disableRipple onClick={(e) => {}}>
                <VersionsIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title={iMessage('title', 'packageDependencies')}>
            <div>
              <IconButton color="primary" disableRipple onClick={(e) => {}}>
                <DependenciesIcon />
              </IconButton>
            </div>
          </Tooltip>
        </Toolbar>
      </Grid>
    </Grid>
  );
};

NotificationDetails.propTypes = {
  classes: objectOf(string).isRequired,
  active: object,
};

export default withStyles(styles)(NotificationDetails);
