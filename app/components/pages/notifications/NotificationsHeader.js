import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

const rows = [
  {
    id: 'required',
    numeric: false,
    disablePadding: false,
    label: 'required'
  },
  {
    id: 'required by',
    numeric: false,
    disablePadding: false,
    label: 'required by'
  }
];

const NotificationsHeader = ({ onSelectAllClick, numSelected, rowCount }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
      {rows.map(row => (
        <TableCell
          key={row.id}
          align={row.numeric ? 'right' : 'left'}
          padding={row.disablePadding ? 'none' : 'default'}
        >
          {row.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

NotificationsHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default NotificationsHeader;
