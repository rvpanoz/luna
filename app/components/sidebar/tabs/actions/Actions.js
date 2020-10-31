import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import InstallIcon from '@material-ui/icons/ArchiveOutlined';
import CacheCleanIcon from '@material-ui/icons/DeleteSweepOutlined';
import CacheCleanVerify from '@material-ui/icons/VerticalAlignBottom';
import ShrinkWrapIcon from '@material-ui/icons/CenterFocusWeakOutlined';
import DedupeIcon from '@material-ui/icons/CenterFocusWeakOutlined';
import Typography from '@material-ui/core/Typography';
import { iMessage } from 'commons/utils';

import styles from './styles';

const ActionItem = ({ classes, mode, label, details, handler, icon }) => {
  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={
          <div className={classes.flexWrapper}>
            {icon}
            <Typography className={classes.label}>{label}</Typography>
          </div>
        }
        secondary={
          <Typography className={classes.secondaryText}>{details}</Typography>
        }
      />
      <ListItemSecondaryAction>
        <Tooltip>
          <div>
            <IconButton
              aria-label="action-install"
              disabled={mode === 'global'}
              onClick={handler}
              disableRipple
            >
              <ArrowRightIcon
                color={mode === 'global' ? 'inherit' : 'primary'}
              />
            </IconButton>
          </div>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

ActionItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

const WithStylesActionItem = withStyles(styles)(ActionItem);

const ActionsTab = ({
  classes,
  mode,
  onInstallPackagesFromJson,
  onCacheClean,
  onCacheVerify,
  onShrinkWrap,
  onDedupe,
}) => {
  const actions = [
    {
      label: 'npm install',
      details: 'Install packages from package.json',
      handler: onInstallPackagesFromJson,
      icon: <InstallIcon color="secondary" />,
    },
    {
      label: 'npm cache clean',
      details: 'Delete all data out of the cache folder.',
      handler: onCacheClean,
      icon: <CacheCleanIcon color="secondary" />,
    },
    {
      label: 'npm cache verify',
      details: 'Verify the contents of the cache folder',
      handler: onCacheVerify,
      icon: <CacheCleanVerify color="secondary" />,
    },
    {
      label: 'npm shrinkwrap',
      details:
        'Repurposes package-lock.json into a publishable npm-shrinkwrap.json',
      handler: onShrinkWrap,
      icon: <ShrinkWrapIcon color="secondary" />,
    },
    {
      label: 'npm dedupe',
      details: 'Mode dependencies further up the tree',
      handler: onDedupe,
      icon: <DedupeIcon color="secondary" />,
    },
  ];

  return (
    <>
      <div className={classes.header}>
        <Typography className={classes.title} color="textSecondary">
          {iMessage('title', 'actions')}
        </Typography>
        <Divider />
      </div>
      <div className={classes.content}>
        <List dense>
          {actions.map((action) => (
            <WithStylesActionItem {...action} mode={mode} />
          ))}
        </List>
      </div>
    </>
  );
};

ActionsTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onInstallPackagesFromJson: PropTypes.func.isRequired,
  onCacheClean: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

export default withStyles(styles)(ActionsTab);
