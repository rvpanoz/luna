import { triggerEvent } from 'utils'
import { withStyles } from 'material-ui/styles'
import { tableListStyles } from './styles'
import React from 'react'
import Loader from 'common/Loader'
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
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox'
import Menu, { MenuItem } from 'material-ui/Menu'
import InfoButton from 'material-ui-icons/Info'
import RefreshIcon from 'material-ui-icons/Refresh'
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
    toggleMainLoader,
    handleSort,
    rowsPerPage,
    isSelected,
    handleClick,
    handleSelectAllClick,
    viewPackage,
    handleChangeRowsPerPage,
    handleChangePage,
    mode,
    directory,
    loading
  } = props

  const numSelected = selected.length
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, packages.length - page * rowsPerPage)

  return (
    <Loader loading={loading}>
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
                  className={classes.tableRow}
                  hover
                  role="checkbox"
                  onClick={(e) => {
                    toggleMainLoader(true)
                    const _version = version.replace(/\^/g, '')
                    viewPackage(e, name, _version, mode, directory)
                  }}
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={`pkgrow-${idx}`}
                  selected={alreadySelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={(e) => handleClick(e, name)}
                      checked={alreadySelected}
                    />
                  </TableCell>
                  <TableCell padding="none">{name}</TableCell>
                  <TableCell padding="none">{version}</TableCell>
                  <TableCell padding="none">{latest || version}</TableCell>
                  <TableCell padding="none">{license}</TableCell>
                  {latest ? (
                    <TableCell padding="none">
                      <IconButton>
                        <RefreshIcon />
                      </IconButton>
                    </TableCell>
                  ) : (
                    <TableCell padding="none" />
                  )}
                </TableRow>
              )
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={6}
              count={packages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page'
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page'
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Loader>
  )
}

export default withStyles(tableListStyles)(TableList)
