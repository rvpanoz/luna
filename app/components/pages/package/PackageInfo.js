/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import styles from './styles/packageInfo';

const PackageInfo = ({ classes, active, dependencies, short }) => {
  const enchancedActive = Object.assign({}, active, {
    repository: active.repository || {},
    dist: active.dist || {}
  });

  const {
    versions,
    homepage,
    repository: { url },
    dist: { tarball },
    engines
  } = enchancedActive;

  return (
    <React.Fragment>
      {short ? null : (
        <List dense={true}>
          <ListItem key="active-versions" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  Versions
                </Typography>
              }
              secondary={
                <Typography variant="caption">
                  {versions ? versions.length : 'N/A'}
                </Typography>
              }
            />
          </ListItem>
          <ListItem key="active-dependencies" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  Dependencies
                </Typography>
              }
              secondary={
                <Typography variant="caption">
                  {dependencies ? dependencies.length : 'N/A'}
                </Typography>
              }
            />
          </ListItem>
          <ListItem key="active-homepage" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  Homepage
                </Typography>
              }
              secondary={
                <Typography variant="caption">{homepage || 'N/A'}</Typography>
              }
            />
          </ListItem>
          <ListItem key="active-git" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  Repository
                </Typography>
              }
              secondary={
                <Typography variant="caption">{url || 'N/A'}</Typography>
              }
            />
          </ListItem>
          <ListItem key="active-engines" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  Engines
                </Typography>
              }
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
              primary={
                <Typography variant="subtitle1" color="primary">
                  Tarball
                </Typography>
              }
              secondary={
                <Typography variant="caption">{tarball || 'N/A'}</Typography>
              }
            />
          </ListItem>
        </List>
      )}
    </React.Fragment>
  );
};

PackageInfo.propTypes = {
  active: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool
    ])
  ).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  short: PropTypes.bool,
  dependencies: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(PackageInfo);
