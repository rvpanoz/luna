import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

import InstallIcon from '@material-ui/icons/Add';

const rows = [
  {
    id: 'requiredBy',
    numeric: false,
    disablePadding: true,
    label: 'required by'
  },
  { id: 'required', numeric: false, disablePadding: false, label: 'required' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' }
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
          <Tooltip
            title="Sort"
            placement={row.numeric ? 'bottom-end' : 'bottom-start'}
            enterDelay={300}
          >
            <TableSortLabel>{row.label}</TableSortLabel>
          </Tooltip>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

NotificationsHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default NotificationsHeader;
