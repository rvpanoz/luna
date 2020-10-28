import { shell } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/LinkTwoTone';
import DownloadIcon from '@material-ui/icons/ArchiveOutlined';
import { iMessage } from 'commons/utils';

import styles from './styles';

const PackageListItem = ({ classes, primary, secondary }) => {
  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={
          <Typography variant="body2" color="textSecondary">
            {primary}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <Typography color="textSecondary" variant="body2">
          {secondary}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

PackageListItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const WithStylesPackageListItem = withStyles(styles)(PackageListItem);

const PackageInfo = ({ classes, active, dependencies }) => {
  const enchancedActive = Object.assign({}, active, {
    repository: active.repository || {},
    dist: active.dist || {},
    distTags: active['dist-tags'] || {},
    bugs: (active && active.bugs) || { url: '' },
  });

  const {
    versions,
    homepage,
    bugs: { url: bugsUrl },
    dist: { tarball },
    engines,
    distTags,
  } = enchancedActive;

  const items = [
    {
      key: 'pkginfo-versions',
      primary: iMessage('label', 'versions'),
      secondary: versions ? versions.length : 'N/A',
    },
    {
      key: 'pkginfo-latest',
      primary: iMessage('label', 'latest'),
      secondary: distTags && distTags.latest ? distTags.latest : 'N/A',
    },
    {
      key: 'pkginfo-next',
      primary: iMessage('label', 'next'),
      secondary: distTags && distTags.next ? distTags.next : 'N/A',
    },
    {
      key: 'pkginfo-deps',
      primary: iMessage('label', 'dependencies'),
      secondary: dependencies ? dependencies.length : 'N/A',
    },
    {
      key: 'pkginfo-engines',
      primary: iMessage('label', 'engines'),
      secondary: engines
        ? Object.keys(engines).map(
            (engineKey) => `${engineKey}${engines[engineKey]} `
          )
        : 'N/A',
    },
    {
      key: 'pkginfo-tarball',
      primary: iMessage('label', 'tarball'),
      secondary: tarball && (
        <Tooltip title="Download tarball">
          <a href={tarball} className={classes.link}>
            <DownloadIcon />
          </a>
        </Tooltip>
      ),
    },
    {
      key: 'pkginfo-homepage',
      primary: iMessage('label', 'homepage'),
      secondary: homepage && (
        <Tooltip title="Navigate to package home page">
          <a
            href="#"
            className={classes.link}
            onClick={() => shell.openExternal(homepage)}
          >
            <LinkIcon />
          </a>
        </Tooltip>
      ),
    },
    {
      key: 'pkginfo-issues',
      primary: iMessage('label', 'issues'),
      secondary: bugsUrl && (
        <Tooltip title="Navigate to package issues page">
          <a
            href="#"
            className={classes.link}
            onClick={() => shell.openExternal(bugsUrl)}
          >
            <LinkIcon />
          </a>
        </Tooltip>
      ),
    },
  ];

  return (
    <List>
      {items.map((item) => (
        <WithStylesPackageListItem {...item} />
      ))}
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
