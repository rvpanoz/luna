import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import tableHeadStyles from 'styles/tableHeadStyles'
import {
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from 'material-ui/Table'
import { withStyles } from 'material-ui/styles'
import Tooltip from 'material-ui/Tooltip'
import Checkbox from 'material-ui/Checkbox'

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'version', numeric: false, disablePadding: true, label: 'Version' },
  { id: 'latest', numeric: false, disablePadding: true, label: 'Latest' }
]

class TableListHeader extends React.Component {
  createSortHandler = (property) => (e) => {
    this.props.onRequestSort(e, property)
  }

  render() {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props

    return (
      <TableHead className={classes.primaryTableHeader}>
        <TableRow>
          <TableCell
            padding="checkbox"
            className={classnames(classes.tableCell, classes.tableHeadCell)}
          >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map((column) => {
            return (
              <TableCell
                className={classes.tableCell}
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
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

export default withStyles(tableHeadStyles)(TableListHeader)
