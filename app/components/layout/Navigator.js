/* eslint-disable react/require-default-props */

import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'redux-react-hook';
import { ipcRenderer, remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/FolderOpen';

import AppTabs from 'components/common/AppTabs';
import AppButton from 'components/units/Buttons/AppButton';
import { APP_GLOBALS, APP_MODES } from 'constants/AppConstants';
import { setMode } from 'models/ui/actions';

import styles from './styles/navigator';

const Navigator = ({
  classes,
  mode,
  lastUpdatedAt,
  title,
  total,
  ...other
}) => {
  const [openedDirectories, setOpenedDirectories] = useState([]);
  const dispatch = useDispatch();

  const handleDirectory = useCallback(directory => {
    dispatch(setMode({ mode: APP_MODES.local, directory }));
  }, []);

  useEffect(() => {
    ipcRenderer.on('loaded-packages-close', (event, directories) => {
      setOpenedDirectories(directories);
    });

    return () => ipcRenderer.removeAllListeners('loaded-packages-close');
  }, [openedDirectories.length]);

  const openPackage = useCallback(() => {
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        title: 'Open package.json file',
        buttonLabel: 'Analyze',
        filters: [
          {
            name: 'package.json',
            extensions: ['json']
          }
        ],
        properties: ['openFile']
      },
      filePath => {
        if (filePath) {
          const directory = filePath.join('');
          handleDirectory(directory);
        }
      }
    );
  }, []);

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            Luna
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText className={classes.actionButton}>
            <AppButton color="primary" fullWidth onClick={() => openPackage()}>
              Analyze
            </AppButton>
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText>
            <StatsCard title="Packages" total={total} />
          </ListItemText>
        </ListItem>
        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            Details
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <AppTabs />
          </ListItemText>
        </ListItem>
        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            History
          </ListItemText>
        </ListItem>

        {openedDirectories &&
          openedDirectories.map((dir, idx) => (
            <ListItem
              dense
              button
              onClick={() => handleDirectory(dir.directory)}
              key={`directory-${idx + 1}`}
              className={classNames(classes.item)}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense
                }}
              >
                {dir.name}
              </ListItemText>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

Navigator.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string,
  projectName: PropTypes.string,
  projectVersion: PropTypes.string
};

export default withStyles(styles)(Navigator);
