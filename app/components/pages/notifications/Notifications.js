/* eslint-disable */

import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import semver from 'semver';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { pluck, merge } from 'ramda';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import ControlTypes from 'components/common/ControlTypes';
import { setupInstallOptions } from 'commons/utils';
import { installPackages } from 'models/packages/actions';
import {
  WARNING_MESSAGES,
  INFO_MESSAGES,
  PACKAGE_GROUPS
} from 'constants/AppConstants';
import { setSnackbar } from 'models/ui/actions';

import NotificationsHeader from './NotificationsHeader';
import NotificationsToolbar from './NotificationsToolbar';

import styles from './styles/notifications';

const mapState = ({ common: { mode, directory, notifications } }) => ({
  mode,
  directory,
  notifications
});

const parseRequiredBy = name => name && name.replace('required by', '').trim();
const parseRequired = (name, position) => name && name.split('@')[position];

const Notifications = ({ classes }) => {
  const [selected, setSelected] = useState([]);
  const [isExtraneous, setExtraneous] = useState(false);
  const [optionsOpen, toggleOptions] = useState(false);
  const [installOptions, setInstallOptions] = useState([]);

  const { mode, directory, notifications } = useMappedState(mapState);

  const dispatch = useDispatch();

  useEffect(() => {
    const hasExtraneous =
      notifications &&
      notifications.some(notification => {
        const { required, body } = notification;
        return body === 'extraneous' || required === 'ENOENT';
      });

    setExtraneous(hasExtraneous);
  }, [notifications]);

  const handleSelectAllClick = e => {
    if (e.target.checked) {
      const allSelected = notifications.map((n, idx) => {
        const name = parseRequired(n.required, 0);
        const version = parseRequired(n.required, 1);
        const { raw } = semver.coerce(version);

        return {
          idx,
          name,
          version: raw
        };
      });

      return setSelected(allSelected);
    }

    setSelected([]);
  };

  const handleInstall = () => {
    if (mode === 'local') {
      return toggleOptions(true);
    }

    const parameters = {
      ipcEvent: 'install',
      cmd: ['install'],
      multiple: true,
      packages: selected,
      mode,
      directory
    };

    dispatch(installPackages(parameters));
  };

  const handleInstallLocal = useCallback(() => {
    const packagesWithOptions = setupInstallOptions(selected, installOptions);
    const installations = Object.values(packagesWithOptions);
    const groups = Object.keys(packagesWithOptions);

    // run install multiple times
    const commands = installations.map((pkgs, idx) => ({
      operation: 'install',
      pkgs,
      group: groups[idx],
      flags: PACKAGE_GROUPS[groups[idx]]
    }));

    const parameters = {
      activeManager: 'npm',
      ipcEvent: 'install',
      cmd: pluck('operation', commands.filter(command => command.pkgs.length)),
      packages: pluck('pkgs', commands.filter(command => command.pkgs.length)),
      pkgOptions: pluck(
        'flags',
        commands.filter(command => command.pkgs.length)
      ),
      multiple: true,
      mode,
      directory
    };

    dispatch(installPackages(parameters));
  }, [selected, installOptions]);

  const handleClick = useCallback(
    (event, name, version, idx) => {
      const needle = {
        idx,
        name,
        version
      };

      const isNewerVersionSelected = selected.find(
        selectedItem =>
          selectedItem.name === name && semver.gt(selectedItem.version, version)
      );

      const isOldVersionSelected = selected.find(
        selectedItem =>
          selectedItem.name === name && semver.lt(selectedItem.version, version)
      );

      if (isNewerVersionSelected) {
        dispatch(
          setSnackbar({
            open: true,
            type: 'warning',
            message: WARNING_MESSAGES.newerSelected
          })
        );

        return;
      }

      if (isOldVersionSelected) {
        dispatch(
          setSnackbar({
            open: true,
            type: 'warning',
            message: WARNING_MESSAGES.oldSelected
          })
        );

        return;
      }

      const selectedIndex = selected
        .map(selectedItem => selectedItem.idx)
        .indexOf(idx);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, needle);
      } else if (selectedIndex >= 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  return (
    <section className={classes.root}>
      <Grid container spacing={16}>
        <Grid item md={12} lg={8} xl={8}>
          {!notifications || notifications.length === 0 ? (
            <Typography variant="subtitle1">No problems found!</Typography>
          ) : (
            <Paper className={classes.root}>
              <NotificationsToolbar
                total={notifications.length}
                numSelected={selected.length || 0}
                handleInstall={handleInstall}
              />
              <div className={classes.tableWrapper}>
                <Table
                  className={classes.table}
                  aria-labelledby="notificationsHeader"
                >
                  {isExtraneous ? (
                    <TableBody>
                      <TableRow tabIndex={-1} key="extraneous-packages">
                        <TableCell className={classes.tableCell}>
                          <Typography>
                            Found extraneous packages. Run <i>npm prune</i> in
                            the Tools tab to fix them.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <React.Fragment>
                      <NotificationsHeader
                        numSelected={selected.length || 0}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={notifications.length || 0}
                      />
                      <TableBody>
                        {notifications.map((notification, idx) => {
                          const { required, requiredBy } = notification;

                          if (!isExtraneous) {
                            const name = parseRequired(required, 0);
                            const version = parseRequired(required, 1);
                            const { raw } = semver.coerce(version) || 'N/A';

                            const isSelected =
                              selected
                                .map(selectedItem => selectedItem.idx)
                                .indexOf(idx) > -1;

                            return (
                              <TableRow
                                hover
                                onClick={event =>
                                  handleClick(event, name, raw, idx)
                                }
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={`notification-item-${idx}`}
                                selected={isSelected}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox checked={isSelected} />
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  <Typography>
                                    {parseRequiredBy(requiredBy)}
                                  </Typography>
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  <Typography>{name}</Typography>
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                  <Typography>{raw}</Typography>
                                </TableCell>
                              </TableRow>
                            );
                          }
                        })}
                      </TableBody>
                    </React.Fragment>
                  )}
                </Table>
              </div>
            </Paper>
          )}
        </Grid>
      </Grid>
      <Dialog
        open={optionsOpen}
        onClose={() => toggleOptions(!optionsOpen)}
        aria-labelledby="install-options"
        maxWidth="md"
      >
        <DialogTitle id="install-options">Install options</DialogTitle>
        <DialogContent>
          <DialogContentText>{INFO_MESSAGES.installing}</DialogContentText>
          <div className={classes.flexContainer} style={{ minWidth: 400 }}>
            <List dense className={classes.list}>
              {selected.map(pkg => {
                let selectedValue = 'save-prod';

                const itemOptionsByName = installOptions.find(
                  installOption => installOption.name === pkg.name
                );

                if (
                  itemOptionsByName &&
                  typeof itemOptionsByName === 'object'
                ) {
                  selectedValue = itemOptionsByName.options[0];
                }
                console.log(selectedValue);
                return (
                  <ListItem key={pkg.name}>
                    <ListItemText primary={pkg.name} />
                    <ListItemSecondaryAction>
                      <ControlTypes
                        selectedValue={selectedValue}
                        packageName={pkg.name}
                        onSelect={payload => {
                          const { name, options } = payload;
                          const newInstallOptions = [
                            ...installOptions,
                            payload
                          ];

                          setInstallOptions(newInstallOptions);
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOptions(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleInstallLocal()}
            color="primary"
            autoFocus
          >
            Install
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(Notifications);
