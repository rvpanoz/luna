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

import DependencyIcon from '@material-ui/icons/CodeOutlined';
import DevDependencyIcon from '@material-ui/icons/BuildOutlined';
import GlobalIcon from '@material-ui/icons/GroupWorkSharp';
import OptionalIcon from '@material-ui/icons/SettingsEthernetOutlined';

import { doTogglePackageLoader } from 'models/ui/selectors';

import { listStyles as styles } from '../styles/packagesStyles';

const PackageItemRow = props => {
  const {
    classes,
    name,
    manager,
    isSelected,
    setSelected,
    version,
    latest,
    isOutdated,
    group
  } = props;

  const dispatch = useDispatch();

  const viewPackage = useCallback(
    (manager, name, version, mode, directory, latest) => {
      doTogglePackageLoader(dispatch, {
        loading: true,
        message: `Loading ${name}@${version}`
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
    },
    [name]
  );

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
      onClick={e => viewPackage(manager, name)}
    >
      <TableCell padding="checkbox" style={{ width: '85px' }}>
        <Checkbox
          checked={isSelected}
          onClick={e => {
            e.stopPropagation();
            setSelected(name);
          }}
        />
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        {name}
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
      <TableCell padding="none" className={classes.tableCell}>
        {cond([
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
          ]
        ])(group)}
      </TableCell>
    </TableRow>
  );
};

PackageItemRow.propTypes = {
  classes: objectOf(string).isRequired,
  name: string.isRequired,
  isSelected: bool.isRequired,
  version: string.isRequired,
  isOutdated: bool.isRequired,
  setSelected: func.isRequired,
  latest: oneOfType([string, object]),
  group: string
};

export default withStyles(styles)(PackageItemRow);
