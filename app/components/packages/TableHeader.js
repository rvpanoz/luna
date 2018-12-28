/* eslint-disable */

/**
 Table Header 
**/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { and } from 'ramda';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'version', disablePadding: true, label: 'Version' },
  { id: 'latest', disablePadding: true, label: 'Latest' },
  { id: 'group', disablePadding: true, label: 'Group' }
];

const TableHeader = props => {
  const {
    classes,
    numSelected,
    rowCount,
    packages,
    onSelected,
    onClearSelected,
    toggleSort,
    sortDir,
    sortBy
  } = props;

  const handleSelectAll = e => {
    const { checked } = e.target;

    checked
      ? packages && packages.forEach(pkgName => onSelected(pkgName, true))
      : onClearSelected();
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={handleSelectAll}
          />
        </TableCell>
        {columnData.map(column => {
          const needSort =
            and(!!sortBy, !!column.id) && and(true, sortBy === column.id);

          return (
            <TableCell
              key={column.id}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={sortBy === column.id ? sortDir : false}
            >
              {needSort ? (
                <TableSortLabel
                  active={sortBy === column.id}
                  direction={sortDir}
                  onClick={e => toggleSort(e, column.id)}
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
  rowCount: PropTypes.number.isRequired,
  sortBy: PropTypes.string,
  sortDir: PropTypes.string
};

export default TableHeader;
