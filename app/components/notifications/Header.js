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
  {
    id: 'name',
    label: 'Package',
  },
  { id: 'version', label: 'Version' },
];

const TableHeader = ({ selected, total, sortBy, sortDir }) => (
  <TableHead>
    <TableRow>
      {columnData.map((column) => {
        const needSort =
          and(!!sortBy, !!column.id) && and(true, sortBy === column.id);

        return (
          <Hidden mdDown={column.hiddenSm} key={column.id}>
            <TableCell>{column.label}</TableCell>
          </Hidden>
        );
      })}
    </TableRow>
  </TableHead>
);

TableHeader.propTypes = {
  total: PropTypes.number,
};

export default TableHeader;
