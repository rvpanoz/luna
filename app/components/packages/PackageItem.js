/* eslint-disable */
/* eslint-disable react/prop-types */

/**
 * Package item row
 */

import { ipcRenderer } from 'electron';
import React, { useCallback } from 'react';
import cn from 'classnames';
import { useDispatch } from 'redux-react-hook';
import { bool, objectOf, object, string, func, oneOfType } from 'prop-types';
import { always, cond, equals } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import DependencyIcon from '@material-ui/icons/CodeOutlined';
import DevDependencyIcon from '@material-ui/icons/BuildOutlined';
import GlobalIcon from '@material-ui/icons/GroupWorkOutlined';
import OptionalIcon from '@material-ui/icons/SettingsEthernetOutlined';
import PeersIcon from '@material-ui/icons/BallotOutlined';

import { onTogglePackageLoader } from 'models/ui/selectors';

import { listStyles as styles } from '../styles/packagesStyles';

const PackageItemRow = ({
  classes,
  name,
  manager,
  isSelected,
  addSelected,
  version,
  latest,
  isOutdated,
  group
}) => {
  const dispatch = useDispatch();

  const renderIconByGroup = useCallback(
    group =>
      cond([
        [equals(''), always(<GlobalIcon className={classes.icon} />)],
        [
          equals('dependencies'),
          always(<DependencyIcon className={classes.icon} />)
        ],
        [
          equals('devDependencies'),
          always(<DevDependencyIcon className={classes.icon} />)
        ],
        [
          equals('optionalDependencies'),
          always(<OptionalIcon className={classes.icon} />)
        ],
        [
          equals('peerDependencies'),
          always(<PeersIcon className={classes.icon} />)
        ]
      ])(group),
    [group]
  );

  const viewPackage = (manager, name, version, mode, directory) => {
    onTogglePackageLoader(dispatch, {
      loading: true
    });

    ipcRenderer.send('ipc-event', {
      activeManager: manager,
      ipcEvent: 'view',
      cmd: ['view'],
      name,
      mode,
      directory
    });

    return false;
  };

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
      onClick={() => viewPackage(manager, name)}
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
      <TableCell padding="none" className={classes.tableCell}>
        <div className={classes.flexContainer}>
          <div className={classes.flexItem}>{renderIconByGroup(group)}</div>
          <div className={cn(classes.flexItem, classes.iconContainer)}>
            {name}
          </div>
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

PackageItemRow.propTypes = {
  classes: objectOf(string).isRequired,
  name: string.isRequired,
  addSelected: func.isRequired,
  isSelected: bool.isRequired,
  version: string.isRequired,
  isOutdated: bool.isRequired,
  latest: oneOfType([string, object]),
  group: string
};

export default withStyles(styles)(PackageItemRow);
