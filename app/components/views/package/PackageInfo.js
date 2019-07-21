import { shell } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';

import { iMessage } from 'commons/utils'
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

  const openUrl = link => shell.openExternal(link);

  return (
    <React.Fragment>
      {short ? null : (
        <List dense>
          <ListItem key="active-versions" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="textSecondary">
                  {iMessage('label', 'versions')}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography color="textSecondary" variant="h6">
                {versions ? versions.length : 'N/A'}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem key="active-latest-tags" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="textSecondary">
                  {iMessage('label', 'latest')}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography color="textSecondary" variant="h6">
                {distTags && distTags.latest ? distTags.latest : 'N/A'}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem key="active-next-tags" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="textSecondary">
                  {iMessage('label', 'next')}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography variant="h6" color="textSecondary">
                {distTags && distTags.next ? distTags.next : 'N/A'}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem key="active-dependencies" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="textSecondary">
                  {iMessage('label', 'dependencies')}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography variant="h6" color="textSecondary">
                {dependencies ? dependencies.length : 'N/A'}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem key="active-homepage" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="textSecondary">
                  {iMessage('label', 'homepage')}
                </Typography>
              }
              secondary={
                homepage && (
                  <a
                    href="#"
                    onClick={() => openUrl(homepage)}
                    className={classes.link}
                  >
                    {iMessage('label', 'visitHomepage')}
                  </a>
                )
              }
            />
          </ListItem>
          <ListItem key="active-git" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="textSecondary">
                  {iMessage('label', 'repository')}
                </Typography>
              }
              secondary={
                url && (
                  <a
                    href="#"
                    onClick={() => openUrl(url)}
                    className={classes.link}
                  >
                    {iMessage('label', 'visitGithub')}
                  </a>
                )
              }
            />
          </ListItem>
          <ListItem key="active-engines" className={classes.listItem}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="textSecondary">
                  {iMessage('label', 'engines')}
                </Typography>
              }
              secondary={
                <Typography variant="subtitle1" color="textSecondary" className={classes.labelMini}>
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
                <Typography variant="subtitle1" color="textSecondary">
                  {iMessage('label', 'tarball')}
                </Typography>
              }
              secondary={
                tarball && (
                  <a href={tarball} className={classes.link}>
                    {iMessage('label', 'download')}
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
