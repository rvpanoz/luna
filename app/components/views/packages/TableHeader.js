/* eslint-disable react/require-default-props */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { and } from 'ramda';
import { useDispatch } from 'redux-react-hook';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { addSelected, clearSelected, setSortOptions } from 'models/ui/actions';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'version', disablePadding: true, label: 'Installed' },
  { id: 'latest', disablePadding: true, label: 'Latest' },
  { id: 'Status', disablePadding: true, label: 'Status' }
];

const TableHeader = ({ numSelected, rowCount, packages, sortBy, sortDir }) => {
  const dispatch = useDispatch();
  const checkboxAll = useRef(null);

  const toggleSort = prop =>
    dispatch(
      setSortOptions({
        sortDir: sortDir === 'desc' ? 'asc' : 'desc',
        sortBy: prop
      })
    );

  const handleSelectAll = e => {
    if (e.target.checked && packages) {
      packages.forEach(name =>
        dispatch(
          addSelected({
            name
          })
        )
      );

      return;
    }

    dispatch(clearSelected());
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={handleSelectAll}
            inputProps={{
              ref: checkboxAll
            }}
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
              style={column.id !== 'name' ? { textAlign: 'center' } : {}}
            >
              {needSort ? (
                <TableSortLabel
                  active={sortBy === column.id}
                  direction={sortDir}
                  onClick={() => toggleSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              ) : (
                column.label
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  packages: PropTypes.arrayOf(PropTypes.string),
  sortBy: PropTypes.string,
  sortDir: PropTypes.string
};

export default TableHeader;
