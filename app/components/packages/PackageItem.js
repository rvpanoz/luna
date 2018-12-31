/* eslint-disable */
/* eslint-disable react/prop-types */

/**
 * Package item row
 */

import React from 'react';
import { bool, objectOf, object, string, func, oneOfType } from 'prop-types';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { listStyles as styles } from '../styles/packagesStyles';

const PackageItemRow = props => {
  const {
    classes,
    name,
    isSelected,
    setSelected,
    version,
    latest,
    isOutdated,
    __group
  } = props;

  return (
    <TableRow
      key={`pkg-${name}`}
      hover
      role="checkbox"
      aria-checked={isSelected(name)}
      tabIndex={-1}
      selected={isSelected(name)}
    >
      <TableCell padding="checkbox" style={{ width: '85px' }}>
        <Checkbox
          checked={isSelected(name)}
          onClick={() => setSelected(name)}
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
        {__group}
      </TableCell>
    </TableRow>
  );
};

// PackageItemRow.propTypes = {
//   classes: objectOf(object).isRequired,
//   name: string.isRequired,
//   isSelected: func.isRequired,
//   version: string.isRequired,
//   isOutdated: bool.isRequired,
//   setSelected: func.isRequired,
//   latest: oneOfType([string, object]),
//   __group: string
// };

export default withStyles(styles)(PackageItemRow);
