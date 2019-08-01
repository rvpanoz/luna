import React from 'react';
import { arrayOf, oneOfType, objectOf, string, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

import { Transition } from 'components/common';
import { iMessage } from 'commons/utils';

import styles from './styles/details';

const NotificationDetails = ({ classes, active, setActive }) => {
  const { body, required } = active || {};
  console.log(active);
  return (
    <div className={classes.wrapper}>
      <Grid container justify="space-around">
        <Grid item md={10} lg={10} xl={10}>
          <Transition>
            <Card className={classes.card}>
              <CardHeader
                title={
                  <Typography color="textPrimary" variant="h4">
                    {required}
                  </Typography>
                }
                classes={{
                  root: classes.cardHeader,
                  subheader: classes.subheader
                }}
              />
              <CardContent classes={{ root: classes.cardContent }}>
                <Typography variant="body1">{body}</Typography>
                <Divider className={classes.divider} />
              </CardContent>
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
            <Tooltip title={iMessage('title', 'clearActive')}>
              <div>
                <IconButton
                  color="secondary"
                  disableRipple
                  onClick={setActive(null)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </Tooltip>
          </Toolbar>
        </Grid>
      </Grid>
    </div>
  );
};

NotificationDetails.propTypes = {
  classes: objectOf(string).isRequired,
  active: objectOf(oneOfType([string, arrayOf(string)])).isRequired,
  setActive: func.isRequired
};

export default withStyles(styles)(NotificationDetails);
