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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';

import { Transition } from 'components/common';
import { iMessage } from 'commons/utils';

import styles from './styles/details';

const NotificationDetails = ({ classes, active, clearActive }) => {
  const { body, required, version, requiredBy } = active || {};

  return (
    <div className={classes.wrapper}>
      <Grid container justify="space-around">
        <Grid item md={10} lg={10} xl={10}>
          <Transition>
            <Card className={classes.card}>
              <CardHeader
                title={
                  <Typography color="textPrimary" variant="h4">
                    {required}@{version}
                  </Typography>
                }
                classes={{
                  root: classes.cardHeader,
                  subheader: classes.subheader
                }}
              />
              <CardContent classes={{ root: classes.cardContent }}>
                <Divider className={classes.divider} />
                <Typography variant="body1">{body}</Typography>
                {body !== 'extraneous' ? <><Typography variant="h6" className={classes.title}>
                  {iMessage('title', 'requiredBy')}
                </Typography>
                  <List dense>
                    {requiredBy.map(packageName => {
                      if (packageName) {
                        return <ListItem>
                          <ListItemText
                            primary={packageName}
                          //  secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>
                      }

                      return null
                    })}
                  </List></> : null}
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
                  onClick={clearActive}
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
  clearActive: func.isRequired
};

export default withStyles(styles)(NotificationDetails);
