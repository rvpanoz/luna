/* eslint-disable react/require-default-props */

import { ipcRenderer } from 'electron';
import React, { useCallback, useRef } from 'react';
import cn from 'classnames';
import { bool, objectOf, object, string, func, oneOfType } from 'prop-types';
import { always, cond, equals } from 'ramda';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

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
  const rowRef = useRef();

  const renderIconByGroup = useCallback(
    groupName =>
      cond([
        [equals(''), always(null)],
        [equals('dependencies'), always(null)],
        [equals('devDependencies'), always(<Chip label="dev" />)],
        [equals('optionalDependencies'), always(<Chip label="optional" />)],
        [equals('peerDependencies'), always(<Chip label="peer" />)]
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
          <div ref={rowRef} className={classes.flexItem}>
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
