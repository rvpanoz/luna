import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import {
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'version', numeric: true, disablePadding: false, label: 'Version' },
  { id: 'latest', numeric: true, disablePadding: false, label: 'Latest' },
  { id: 'updated', numeric: false, disablePadding: false, label: 'Updated' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' }
]

class TableListHeader extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          <TableCell key="key-1" numeric={false} />
        </TableRow>
      </TableHead>
    )
  }
}

TableListHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

export default TableListHeader
