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

class TableList extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { mode, directory, toggleLoader } = this.props
    toggleLoader(true)
    triggerEvent('get-packages', {
      cmd: ['outdated', 'list'],
      mode,
      directory
    })
  }
  render() {
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
    } = this.props

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
              if (!pkg) return
              const alreadySelected = isSelected(pkg.from)
              return (
                <TableRow
                  hover
                  onClick={(e) => handleClick(e, pkg.from)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={`pkgrow-${idx}`}
                  selected={alreadySelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={alreadySelected} />
                  </TableCell>
                  <TableCell padding="none">{pkg.from}</TableCell>
                  <TableCell numeric>{pkg.version}</TableCell>
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
}

export default withStyles(tableListStyles)(TableList)
