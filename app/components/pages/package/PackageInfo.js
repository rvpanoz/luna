/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import Typography from '@material-ui/core/Typography';

import styles from './styles/packageInfo';

const PackageInfo = ({ classes, active }) => {
  const {
    homepage,
    repository: { url },
    dist: { tarball },
    engines
  } = active || {};

  return (
    <List dense={true}>
      <ListItem key="active-homepage" className={classes.listItem}>
        <ListItemText
          primary={<Typography>Homepage</Typography>}
          secondary={
            <Typography variant="caption">{homepage || 'N/A'}</Typography>
          }
        />
      </ListItem>
      <ListItem key="active-git" className={classes.listItem}>
        <ListItemText
          primary={<Typography>Repository</Typography>}
          secondary={<Typography variant="caption">{url || 'N/A'}</Typography>}
        />
      </ListItem>
      <ListItem key="active-engines" className={classes.listItem}>
        <ListItemText
          primary={<Typography>Engines</Typography>}
          secondary={
            <Typography variant="caption">
              {engines
                ? Object.keys(engines).map(
                    engineKey => `${engineKey}${engines[engineKey]} `
                  )
                : 'N/A'}
            </Typography>
          }
        />
      </ListItem>
      <ListItem key="active-dist" className={classes.listItem}>
        <ListItemText
          primary={<Typography>Tarball</Typography>}
          secondary={
            <Typography variant="caption">{tarball || 'N/A'}</Typography>
          }
        />
      </ListItem>
    </List>
  );
};

PackageInfo.propTypes = {
  active: PropTypes.object,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PackageInfo);
