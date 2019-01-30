/* eslint-disable react/require-default-props */

import { ipcRenderer } from 'electron';
import React, { useCallback } from 'react';
import cn from 'classnames';
import { bool, objectOf, object, string, func, oneOfType } from 'prop-types';
import { always, cond, equals } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import DependencyIcon from '@material-ui/icons/CodeOutlined';
import DevDependencyIcon from '@material-ui/icons/BuildOutlined';
import GlobalIcon from '@material-ui/icons/GroupWorkOutlined';
import OptionalIcon from '@material-ui/icons/SettingsEthernetOutlined';
import PeersIcon from '@material-ui/icons/BallotOutlined';

import { listStyles as styles } from './styles/packagesStyles';

const PackageItem = ({
  classes,
  name,
  manager,
  isSelected,
  addSelected,
  version,
  latest,
  isOutdated,
  group,
  mode,
  directory
}) => {
  const renderIconByGroup = useCallback(
    groupName =>
      cond([
        [
          equals(''),
          always(
            <Avatar
              className={cn(classes.avatar, classes[`${groupName}Avatar`])}
            >
              <GlobalIcon className={classes.icon} />
            </Avatar>
          )
        ],
        [
          equals('dependencies'),
          always(
            <Avatar
              className={cn(classes.avatar, classes[`${groupName}Avatar`])}
            >
              <DependencyIcon className={classes.icon} />
            </Avatar>
          )
        ],
        [
          equals('devDependencies'),
          always(
            <Avatar
              className={cn(classes.avatar, classes[`${groupName}Avatar`])}
            >
              <DevDependencyIcon className={classes.icon} />
            </Avatar>
          )
        ],
        [
          equals('optionalDependencies'),
          always(
            <Avatar
              className={cn(classes.avatar, classes[`${groupName}Avatar`])}
            >
              <OptionalIcon className={classes.icon} />
            </Avatar>
          )
        ],
        [
          equals('peerDependencies'),
          always(
            <Avatar
              className={cn(classes.avatar, classes[`${groupName}Avatar`])}
            >
              <PeersIcon className={classes.icon} />
            </Avatar>
          )
        ]
      ])(groupName),
    [group]
  );

  const viewPackage = () =>
    ipcRenderer.send('ipc-event', {
      activeManager: manager,
      ipcEvent: 'view',
      cmd: ['view'],
      name,
      version,
      mode,
      directory
    });

  return (
    <TableRow
      key={`pkg-${name}`}
      hover
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      selected={isSelected}
      classes={{
        root: classes.tableRow
      }}
      onClick={() => viewPackage()}
    >
      <TableCell padding="checkbox" style={{ width: '85px' }}>
        <Checkbox
          checked={isSelected}
          disableRipple
          onClick={e => {
            e.stopPropagation();
            addSelected();
          }}
        />
      </TableCell>
      <TableCell padding="none" className={cn(classes.tableCell, classes.w300)}>
        <div className={classes.flexContainer}>
          <div className={classes.flexItem}>
            <span>{name}</span>
          </div>
          <div className={classes.flexItem}>{renderIconByGroup(group)}</div>
        </div>
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        {version}
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        <span
          className={cn({
            [classes.outdated]: isOutdated,
            [classes.updated]: !isOutdated
          })}
        >
          {latest || version}
        </span>
      </TableCell>
    </TableRow>
  );
};

PackageItem.propTypes = {
  classes: objectOf(string).isRequired,
  name: string.isRequired,
  addSelected: func.isRequired,
  isSelected: bool.isRequired,
  version: string.isRequired,
  isOutdated: bool.isRequired,
  latest: oneOfType([string, object]),
  group: string,
  manager: string,
  mode: string,
  directory: string
};

export default withStyles(styles)(PackageItem);
