/**
 * Package item row
 */

/* eslint-disable */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { listStyles as styles } from './styles';

const PackageItemRow = props => {
  const {
    classes,
    name,
    isSelected,
    setSelected,
    version,
    isOutdated,
    latest,
    __group
  } = props;

  return (
    <TableRow key={`pkg-${name}`}>
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected(name)} onClick={e => setSelected(name)} />
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        <span
          style={{
            display: 'inline-flex',
            overflowWrap: 'break-word'
          }}
        >
          {name}
        </span>
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        {version}
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        {isOutdated && latest}
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        {__group}
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(PackageItemRow);
