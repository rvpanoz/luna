/* eslint-disable */

/**
 Table Header 
**/

// TODO: use hooks

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { and as Rand } from 'ramda';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import defaultFont from '../../styles/variables';

const styles = () => ({
  tableHeadCell: {
    color: 'inherit',
    ...defaultFont,
    fontSize: 14
  },
  tableCell: {
    ...defaultFont,
    lineHeight: '1.50',
    padding: '0px 13px',
    verticalAlign: 'middle'
  }
});

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'version-id', disablePadding: true, label: 'Version' },
  { id: 'latest-id', disablePadding: true, label: 'Latest' },
  { id: 'group-id', disablePadding: true, label: 'Group' }
];

const TableHeader = props => {
  const {
    classes,
    numSelected,
    rowCount,
    order,
    orderBy,
    sortHandler,
    onSelectAllClick
  } = props;

  return (
    <TableHead className={classes.primaryTableHeader}>
      <TableRow>
        <TableCell
          className={classnames(classes.tableCell, classes.tableHeadCell)}
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columnData.map(column => {
          const needSort =
            Rand(!!orderBy, !!column.id) && Rand(true, orderBy === column.id);
          return (
            <TableCell
              className={classes.tableCell}
              key={column.id}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === column.id ? order : false}
            >
              {needSort ? (
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={sortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              ) : (
                column.label
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
};

// TableListHeader.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.string.isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired
// };

export default withStyles(styles)(TableHeader);
