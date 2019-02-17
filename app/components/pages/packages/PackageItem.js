/* eslint-disable react/require-default-props */

import { ipcRenderer } from 'electron';
import React, { useCallback, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import { bool, objectOf, object, string, func, oneOfType } from 'prop-types';
import { always, cond, equals } from 'ramda';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import Categories from 'components/common/Categories';
import styles from './styles/packages';

const PackageItem = ({
  classes,
  name,
  manager,
  isSelected,
  addSelected,
  addInstallOption,
  installOptions,
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
      ref={rowRef}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      selected={isSelected}
      classes={{
        root: classes.tableRow
      }}
      onClick={viewPackage}
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

      <TableCell padding="none" className={cn(classes.tableCell)}>
        <div className={classes.flexContainer}>
          {renderIconByGroup()}
          <Typography>{name}</Typography>
          {isSelected && (
            <Categories
              onSelect={options => addInstallOption(name, options)}
              options={installOptions && installOptions.options}
            />
          )}
        </div>
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        <Typography>{version}</Typography>
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        <span
          className={cn({
            [classes.outdated]: isOutdated,
            [classes.updated]: !isOutdated
          })}
        >
          <Typography>{latest || version}</Typography>
        </span>
      </TableCell>
    </TableRow>
  );
};

PackageItem.propTypes = {
  classes: objectOf(string).isRequired,
  name: string.isRequired,
  addSelected: func.isRequired,
  addInstallOption: func.isRequired,
  isSelected: bool.isRequired,
  version: string.isRequired,
  isOutdated: bool.isRequired,
  latest: oneOfType([string, object]),
  installOptions: objectOf(object),
  group: string,
  manager: string,
  mode: string,
  directory: string
};

export default withStyles(styles)(PackageItem);
