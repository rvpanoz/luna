import React from 'react';
import PropTypes from 'prop-types';
import { and } from 'ramda';

import Hidden from '@material-ui/core/Hidden';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const columnData = [
  { id: 'required', numeric: false, disablePadding: true, label: 'Required', align: 'left' },
  { id: 'version', numeric: false, disablePadding: true, label: 'Version' },
  { id: 'info', numeric: false, disablePadding: true, label: '', align: 'right' },
];


const TableHeader = ({ selected, total, sortBy, sortDir, handleSelectAll }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox" style={{ width: '55px' }}>
        <Checkbox
          checked={selected.length === total}
          indeterminate={selected.length > 0 && selected.length < total}
          onClick={handleSelectAll}
        />
      </TableCell>
      {columnData.map(column => {
        const needSort =
          and(!!sortBy, !!column.id) && and(true, sortBy === column.id);

        return (
          <Hidden mdDown={column.hiddenSm} key={column.id}>
            <TableCell
              align={column.align}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={sortBy === column.id ? sortDir : false}
            >
              {needSort ? (
                <TableSortLabel active={sortBy === column.id} direction={sortDir}>
                  {column.label}
                </TableSortLabel>
              ) : (
                  column.label
                )}
            </TableCell></Hidden>
        );
      })}
    </TableRow>
  </TableHead>
);

TableHeader.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string),
  sortBy: PropTypes.string,
  sortDir: PropTypes.string,
  handleSelectAll: PropTypes.func,
  total: PropTypes.number
};

export default TableHeader;
