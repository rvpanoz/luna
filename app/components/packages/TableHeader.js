/* eslint-disable */

/**
 Table Header 
**/

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { and } from 'ramda';
import { useDispatch, useMappedState } from 'redux-react-hook';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import {
  doAddSelected,
  doClearSelected,
  doSetSortOptions
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

  const toggleSort = useCallback(
    prop =>
      doSetSortOptions(dispatch, {
        sortDir: sortDir === 'desc' ? 'asc' : 'desc',
        sortBy: prop
      }),
    [sortDir]
  );

  const onClearSelected = useCallback(() => doClearSelected(dispatch), []);

  const handleSelectAll = useCallback(
    ({
      e: {
        target: { checked }
      }
    }) => {
      checked
        ? packages &&
          packages.forEach(name =>
            doAddSelected(dispatch, {
              name,
              force: true
            })
          )
        : onClearSelected();
    },
    [packages]
  );

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={e => handleSelectAll(e)}
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
        }, this)}
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
