import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'redux-react-hook';
import { ipcRenderer, remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FolderIcon from '@material-ui/icons/FolderOpen';
import LoadIcon from '@material-ui/icons/Archive';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import TerminalIcon from '@material-ui/icons/Code';

import { APP_MODES } from 'constants/AppConstants';
import { setMode } from 'models/ui/actions';
import { clearPackages } from 'models/packages/actions';

import { switchcase } from 'commons/utils';
import styles from './styles/navigator';

const menuItems = [
  {
    id: 'Menu',
    children: [
      { id: 'Analyze', icon: <LoadIcon />, active: true },
      { id: 'Tools', icon: <SettingsEthernetIcon /> },
      { id: 'Terminal', icon: <TerminalIcon /> }
    ]
  }
];

const Navigator = ({ classes, ...other }) => {
  const [openedDirectories, setOpenedDirectories] = useState([]);
  const dispatch = useDispatch();

  const handleDirectory = useCallback(directory => {
    dispatch(clearPackages());
    dispatch(setMode({ mode: APP_MODES.LOCAL, directory }));
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
        <ListItem
          className={classNames(
            classes.firebase,
            classes.item,
            classes.itemCategory
          )}
        >
          Luna
        </ListItem>
        <ListItem className={classNames(classes.item, classes.itemCategory)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary
            }}
          >
            Overview
          </ListItemText>
        </ListItem>
        {menuItems.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                button
                dense
                key={childId}
                className={classNames(
                  classes.item,
                  classes.itemActionable,
                  active && classes.itemActiveItem
                )}
                onClick={() =>
                  switchcase({
                    Analyze: () => openPackage(),
                    Terminal: () => {}
                  })()(childId)
                }
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                    textDense: classes.textDense
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Navigator);
