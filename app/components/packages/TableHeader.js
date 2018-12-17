/* eslint-disable */

/**
 Table Header 
**/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { and } from 'ramda';
import { withStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { tableHeaderStyles as styles } from './styles';

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
    packages,
    onSelect,
    onClearSelected,
    setPackages
  } = props;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [sortedPackages, sortPackages] = useState([]);

  const onSelectAll = (e, checked) => {
    checked
      ? packages && packages.forEach(pkg => onSelect(pkg.name))
      : onClearSelected();
  };

  const handleSort = (e, property) => {
    const { packages } = props;
    const newOrderBy = order === 'desc' ? 'asc' : 'desc';

    const data =
      order === 'asc'
        ? packages.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))
        : packages.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1));

    sortPackages(data);
    setOrder(newOrderBy);
  };

  useEffect(
    () => {
      setPackages(sortedPackages);
    },
    [order, orderBy]
  );

  return (
    <TableHead className={classes.primaryTableHeader}>
      <TableRow>
        <TableCell
          className={classnames(classes.tableCell, classes.tableHeadCell)}
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected > 0 && numSelected === rowCount}
            onChange={onSelectAll}
          />
        </TableCell>
        {columnData.map(column => {
          const needSort =
            and(!!orderBy, !!column.id) && and(true, orderBy === column.id);

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
                  onClick={e => handleSort(e, column.id)}
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

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default withStyles(styles)(TableHeader);
