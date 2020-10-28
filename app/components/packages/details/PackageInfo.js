import { shell } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/LinkTwoTone';
import DownloadIcon from '@material-ui/icons/ArchiveOutlined';
import { iMessage } from 'commons/utils';

import styles from './styles';

// const PackageListItem = ({ classes }) => {

// }

// PackageListItem.propTypes = {
//   classes: PropTypes.objectOf(PropTypes.string).isRequired,
// };

// const WithStylesPackageListItem = withStyles(styles)(PackageListItem);

const PackageInfo = ({ classes, active, dependencies }) => {
  const enchancedActive = Object.assign({}, active, {
    repository: active.repository || {},
    dist: active.dist || {},
    distTags: active['dist-tags'] || {},
  });

  const {
    versions,
    homepage,
    bugs: { url: bugsUrl },
    dist: { tarball },
    engines,
    distTags,
  } = enchancedActive;

  return (
    <List>
      <ListItem key="active-versions" className={classes.listItem}>
        <ListItemText
          primary={
            <Typography variant="subtitle1" color="textSecondary">
              {iMessage('label', 'versions')}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <Typography color="textSecondary" variant="subtitle1">
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
          <Typography color="textSecondary" variant="subtitle1">
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
          <Typography variant="subtitle1" color="textSecondary">
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
          <Typography variant="subtitle1" color="textSecondary">
            {dependencies ? dependencies.length : 'N/A'}
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem key="active-engines" className={classes.listItem}>
        <ListItemText
          primary={
            <Typography variant="subtitle1" color="textSecondary">
              {iMessage('label', 'engines')}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.label}
          >
            {engines
              ? Object.keys(engines).map(
                  (engineKey) => `${engineKey}${engines[engineKey]} `
                )
              : 'N/A'}
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem key="active-dist" className={classes.listItem}>
        <ListItemText
          primary={
            <Typography variant="subtitle1" color="textSecondary">
              {iMessage('label', 'tarball')}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <Typography variant="subtitle1" color="textSecondary">
            {tarball && (
              <a href={tarball} className={classes.link}>
                <DownloadIcon />
              </a>
            )}
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
        />
        <ListItemSecondaryAction>
          <Typography variant="subtitle1" color="textSecondary">
            {homepage && (
              <a
                href="#"
                className={classes.link}
                onClick={() => shell.openExternal(homepage)}
              >
                <LinkIcon />
              </a>
            )}
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem key="active-git" className={classes.listItem}>
        <ListItemText
          primary={
            <Typography variant="subtitle1" color="textSecondary">
              {iMessage('label', 'issues')}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <Typography variant="subtitle1" color="textSecondary">
            {bugsUrl && (
              <a
                href="#"
                className={classes.link}
                onClick={() => shell.openExternal(bugsUrl)}
              >
                <LinkIcon />
              </a>
            )}
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};

PackageInfo.propTypes = {
  active: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
    ])
  ).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  dependencies: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles)(PackageInfo);
