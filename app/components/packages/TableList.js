import { triggerEvent } from 'utils'
import { withStyles } from 'material-ui/styles'
import { tableListStyles } from './styles'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import TableListHeader from './TableListHeader'
import Chip from 'material-ui/Chip'

const TableList = (props) => {
  const {
    classes,
    order,
    orderBy,
    total,
    selected,
    packages,
    page,
    handleSort,
    rowsPerPage,
    isSelected,
    handleClick,
    handleSelectAllClick
  } = props

  const numSelected = selected.length
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, packages.length - page * rowsPerPage)

  return (
    <Table className={classes.table}>
      <TableListHeader
        order={order}
        orderBy={orderBy}
        rowCount={total}
        numSelected={numSelected}
        onRequestSort={handleSort}
        onSelectAllClick={handleSelectAllClick}
      />
      <TableBody>
        {packages
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((pkg, idx) => {
            if (!pkg) {
              return
            }
            const {
              hasPeerMissing,
              latest,
              license,
              description,
              version,
              name
            } = pkg
            if (hasPeerMissing) {
              return
            }
            const alreadySelected = isSelected(name)

            return (
              <TableRow
                hover
                onClick={(e) => handleClick(e, name)}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                key={`pkgrow-${idx}`}
                selected={alreadySelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={alreadySelected} />
                </TableCell>
                <TableCell padding="none">{name}</TableCell>
                <TableCell padding="none">{version}</TableCell>
                <TableCell padding="none">{latest || version}</TableCell>
                <TableCell padding="none">{license}</TableCell>
              </TableRow>
            )
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default withStyles(tableListStyles)(TableList)
