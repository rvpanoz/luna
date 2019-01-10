/* eslint-disable */

/**
 Table Header 
**/

import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { and } from 'ramda';
import { useDispatch, useMappedState } from 'redux-react-hook';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import {
  onAddSelected,
  onClearSelected,
  onSetSortOptions
} from 'models/packages/selectors';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'version', disablePadding: true, label: 'Version' },
  { id: 'latest', disablePadding: true, label: 'Latest' },
  { id: 'group', disablePadding: true, label: 'Group' }
];

const mapState = ({ packages: { sortBy, sortDir } }) => ({
  sortBy,
  sortDir
});

const TableHeader = ({ numSelected, rowCount, packages }) => {
  const dispatch = useDispatch();
  const { sortBy, sortDir } = useMappedState(mapState);
  const checkboxAll = useRef(null);

  const toggleSort = useCallback(
    prop =>
      onSetSortOptions(dispatch, {
        sortDir: sortDir === 'desc' ? 'asc' : 'desc',
        sortBy: prop
      }),
    [sortDir]
  );

  const handleSelectAll = e => {
    const { checked } = e && e.target;
    const checkBoxElement = checkboxAll && checkboxAll.current;

    const indeterminate =
      checkBoxElement.dataset && checkBoxElement.dataset.indeterminate;

    if (indeterminate === 'true') {
      onClearSelected(dispatch);
      return;
    }

    packages &&
      packages.forEach(name =>
        onAddSelected(dispatch, {
          name
        })
      );
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
  packages: PropTypes.array.isRequired,
  sortBy: PropTypes.string,
  sortDir: PropTypes.string
};

export default TableHeader;
