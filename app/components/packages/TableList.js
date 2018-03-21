import { withStyles } from 'material-ui/styles'
import { tableListStyles } from './styles'
import { autoBind, triggerEvent } from 'utils'
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
import UpdateIcon from 'material-ui-icons/Update'
import TableListHeader from './TableListHeader'
import Chip from 'material-ui/Chip'

class TableList extends React.PureComponent {
  constructor(props) {
    super(props)
    autoBind(
      [
        'handleChangePage',
        'handleChangeRowsPerPage',
        'handleUpdate',
        'viewPackage',
        'handleClick',
        'handleUpdate'
      ],
      this
    )
  }
  handleUpdate(e) {
    const { mode, directory, selected } = this.props
    if (selected && selected.length) {
      triggerEvent('update-packages', {
        cmd: ['install'],
        multiple: true,
        packages: selected,
        mode,
        directory
      })
    }
  }
  handleChangePage(e, page) {
    const { setPage } = this.props
    setPage(page)
  }
  handleChangeRowsPerPage(e) {
    const { setRowsPerPage } = this.props
    setRowsPerPage(e.target.value)
  }
  handleClick(e, name) {
    e.preventDefault()
    const { selected, setSelectedPackage } = this.props
    setSelectedPackage(name)
    e.stopPropagation()
  }
  viewPackage(e, name, version, mode, directory) {
    if (e) {
      e.preventDefault()
    }
    triggerEvent('view-package', {
      cmd: ['view'],
      pkgName: name,
      pkgVersion: version,
      mode,
      directory
    })
  }
  render() {
    const {
      classes,
      order,
      orderBy,
      rowCount,
      selected,
      packages,
      page,
      toggleMainLoader,
      handleSort,
      rowsPerPage,
      isSelected,
      handleSelectAllClick,
      mode,
      directory,
      loading,
      update
    } = this.props

    const numSelected =
      selected && Array.isArray(selected) ? selected.length : 0
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, packages.length - page * rowsPerPage)

    return (
      <Loader loading={loading}>
        <Table className={classes.table}>
          <TableListHeader
            order={order}
            orderBy={orderBy}
            rowCount={rowCount}
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
                  peerMissing,
                  latest,
                  license,
                  description,
                  version,
                  name
                } = pkg

                //exclude missing dependencies
                if (peerMissing) {
                  return
                }
                const alreadySelected = isSelected(name)

                return (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    role="checkbox"
                    onClick={(e) => {
                      const _version = version.replace(/\^/g, '')
                      toggleMainLoader(true)
                      this.viewPackage(e, name, _version, mode, directory)
                    }}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={`pkgrow-${idx}`}
                    selected={alreadySelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(e) => this.handleClick(e, name)}
                        checked={alreadySelected}
                      />
                    </TableCell>
                    <TableCell padding="none">{name}</TableCell>
                    <TableCell padding="none">{version}</TableCell>
                    <TableCell padding="none">
                      {latest ? (
                        <Chip color="secondary" label={latest} />
                      ) : (
                        version
                      )}
                    </TableCell>
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
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Loader>
    )
  }
}

export default withStyles(tableListStyles)(TableList)
