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

import styles from './styles/installFromSources';

const InstallFromSource = ({ classes }) => (
  <div className={classes.paper}>
    <List dense={true}>
      <ListItem key="project-install" className={classes.listItem}>
        <ListItemText
          primary={<Typography>Package.json</Typography>}
          secondary={
            <Typography variant="caption" component="p">
              Install the dependencies in the local node_modules folder. In
              global mode, it installs the current package context (ie, the
              current working directory) as a global package.
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            title="Install from .package.json"
            aria-label="action"
            onClick={() => {}}
          >
            <ArrowRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem key="tarball-install" className={classes.listItem}>
        <ListItemText
          primary={<Typography>Tarball</Typography>}
          secondary={
            <Typography variant="caption">
              Install a package that is sitting on the filesystem.
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            title="Install from .tar, .tar.gz, or .tgz"
            aria-label="action"
            onClick={() => {}}
          >
            <ArrowRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem key="folder-install" className={classes.listItem}>
        <ListItemText
          primary={<Typography>Folder</Typography>}
          secondary={
            <Typography variant="caption">
              Install the package in the directory as a symlink in the current
              project. Its dependencies will be installed before it’s linked. If
              folder is inside the root of your project, its dependencies may be
              hoisted to the toplevel node_modules.
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            title="Install from folder"
            aria-label="action"
            onClick={() => {}}
          >
            <ArrowRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem key="git-install" className={classes.listItem}>
        <ListItemText
          primary={<Typography>Git repo url</Typography>}
          secondary={
            <Typography variant="caption">
              Installs the package from the hosted git provider, cloning it with
              git. For a full git remote url, only that URL will be attempted.
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            title="Install from git repo"
            aria-label="action"
            onClick={() => {}}
          >
            <ArrowRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </div>
);

InstallFromSource.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InstallFromSource);
