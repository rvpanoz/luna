import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArchiveOutlined';
import FolderIcon from '@material-ui/icons/Folder';
import { iMessage } from 'commons/utils';
import styles from './styles/history';

const HistoryTab = ({ classes, directories, onClick }) => (
  <>
    <div className={classes.header}>
      <Typography className={classes.title} color="textSecondary">
        {iMessage('title', 'history')}
      </Typography>
      <Divider />
    </div>
    <div className={classes.content}>
      <List dense>
        {!directories || !directories.length ? (
          <ListItem dense className={classes.listItem}>
            <ListItemText
              primary={
                <Typography color="textSecondary" className={classes.label}>
                  {iMessage('info', 'noHistory')}
                </Typography>
              }
            />
          </ListItem>
        ) : null}
        {directories.map((dir) => {
          const pathParts = path.parse(dir.directory);
          const directory = pathParts.dir.split('/').slice(0, -1).join('/');

          return (
            <ListItem
              classes={{
                root: classes.listItem,
              }}
              key={dir.name}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className={classes.label}>{dir.name}</Typography>
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title={iMessage('title', 'loadDirectory')}>
                  <IconButton
                    color="primary"
                    aria-label="load-directory"
                    onClick={() => onClick(dir.directory)}
                    disableRipple
                  >
                    <ArrowRightIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  </>
);

HistoryTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  directories: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(HistoryTab);
