/* eslint-disable */

import { shell } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';

import styles from './styles/packageInfo';

const PackageInfo = ({ classes, active, dependencies, short }) => {
  const enchancedActive = Object.assign({}, active, {
    repository: active.repository || {},
    dist: active.dist || {},
    distTags: active['dist-tags'] || {}
  });

  const {
    versions,
    homepage,
    repository: { url },
    dist: { tarball },
    engines,
    distTags
  } = enchancedActive;

  const openUrl = url => shell.openExternal(url);

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
            />
            <ListItemSecondaryAction>
              <Typography className={classes.label} component="p">
                {versions ? versions.length : 'N/A'}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem key="active-latest-tags" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  Latest
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography className={classes.label} component="p">
                {distTags && distTags.latest ? distTags.latest : 'N/A'}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem key="active-next-tags" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  Next
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography className={classes.label} component="p">
                {distTags && distTags.next ? distTags.next : 'N/A'}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem key="active-dependencies" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  Dependencies
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography className={classes.label} component="p">
                {dependencies ? dependencies.length : 'N/A'}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem key="active-homepage" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  Homepage
                </Typography>
              }
              secondary={
                homepage && (
                  <a
                    href="#"
                    onClick={() => openUrl(homepage)}
                    className={classes.link}
                  >
                    Visit homepage
                  </a>
                )
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
                url && (
                  <a
                    href="#"
                    onClick={() => openUrl(url)}
                    className={classes.link}
                  >
                    Visit github
                  </a>
                )
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
                <Typography variant="subtitle1">
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
                tarball && (
                  <a href={tarball} className={classes.link}>
                    Download
                  </a>
                )
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
