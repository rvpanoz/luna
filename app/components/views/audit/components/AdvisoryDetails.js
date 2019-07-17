/* eslint-disable no-unused-vars */

import React from 'react';
import {
  objectOf,
  number,
  string,
  func,
  oneOfType,
  bool,
  array,
  object
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

import { Transition } from 'components/common';
import { iMessage } from 'commons/utils';
import styles from '../styles/advisoryDetails';

const ListItemDetail = ({ text, value }) => (
  <ListItem>
    <ListItemText
      primary={
        <Typography color="textSecondary" variant="body1">
          {text}
        </Typography>
      }
    />
    <ListItemSecondaryAction>
      <Typography color="textSecondary" variant="body1">
        {value}
      </Typography>
    </ListItemSecondaryAction>
  </ListItem>
);

ListItemDetail.propTypes = {
  text: string,
  value: oneOfType([string, number])
};

const AdvisoryDetails = ({ classes, data, handleClose }) => {
  const {
    access,
    name,
    findings,
    title,
    vulnerable_versions,
    recommendation,
    found_by,
    updated,
    created,
    overview,
    deleted,
    severity
  } = data;
  const founder = found_by.name || 'N/A';

  return (
    <div className={classes.wrapper}>
      <Grid container justify="space-between">
        <Grid item sm={10} md={10} lg={10} xl={10}>
          <Transition>
            <Card className={classes.card}>
              <CardHeader
                title={<Typography variant="h6">{name}</Typography>}
                className={classes.cardHeader}
                subheader={
                  <Typography color="textSecondary" variant="caption">
                    {title}
                  </Typography>
                }
              />
              <CardContent className={classes.cardContent}>
                <Typography component="p">
                  {iMessage('label', 'recommendation')}
                </Typography>
                <br />
                <Typography component="p" color="textSecondary">
                  {recommendation}
                </Typography>
                <br />
                <Typography component="p">
                  {iMessage('label', 'vulnerableVersions')}
                </Typography>
                <br />
                <Typography component="p" color="textSecondary">
                  {vulnerable_versions}
                </Typography>
                <Divider className={classes.divider} light />
                <List dense>
                  <ListItemDetail
                    text={iMessage('label', 'severity')}
                    value={severity}
                  />
                  <ListItemDetail
                    text={iMessage('label', 'findings')}
                    value={findings.length}
                  />
                  <ListItemDetail
                    text={iMessage('label', 'access')}
                    value={access}
                  />
                  <ListItemDetail
                    text={iMessage('label', 'found_by')}
                    value={founder}
                  />
                  <ListItemDetail
                    text={iMessage('label', 'created')}
                    value={format(new Date(created), 'DD/MM/YYYY h:mm')}
                  />
                  <ListItemDetail
                    text={iMessage('label', 'updated')}
                    value={format(new Date(updated), 'DD/MM/YYYY h:mm')}
                  />
                </List>
              </CardContent>
            </Card>
          </Transition>
        </Grid>
        <Grid sm={2} item md={2} lg={2} xl={2}>
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
                  onClick={handleClose}
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

AdvisoryDetails.propTypes = {
  classes: objectOf(string).isRequired,
  data: objectOf(oneOfType([object, array, bool, string, number])),
  handleClose: func.isRequired
};

export default withStyles(styles)(AdvisoryDetails);
