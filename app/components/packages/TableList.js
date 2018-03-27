import { withStyles } from 'material-ui/styles'
import { autoBind, triggerEvent } from 'utils'
import tableStyles from 'styles/tableStyles'
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
  viewPackage(e, name, version, mode, directory, repo) {
    if (e) {
      e.preventDefault()
    }
    triggerEvent('view-package', {
      cmd: ['view'],
      pkgName: name,
      pkgVersion: version,
      repo,
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
        <section className={classes.tablelist}>
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
                    return null
                  }

                  const {
                    missing,
                    peerMissing,
                    latest,
                    license,
                    description,
                    deprecated,
                    version,
                    name,
                    repository
                  } = pkg

                  const alreadySelected = isSelected(name)

                  return (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      role="checkbox"
                      onClick={(e) => {
                        const _version = version.replace(/\^/g, '')
                        toggleMainLoader(true)
                        this.viewPackage(
                          e,
                          name,
                          _version,
                          mode,
                          directory,
                          repository
                        )
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
                      <TableCell className={classes.tableCell}>
                        {latest ? (
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <UpdateIcon color="primary" padding="false" />&nbsp;
                            <span
                              style={{
                                top: '4px',
                                left: '0px',
                                position: 'relative'
                              }}
                            >
                              {name}
                            </span>
                          </div>
                        ) : (
                          name
                        )}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {version}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {latest ? <span style={{
                          color: 'red'
                        }}>{latest}</span> : version}
                      </TableCell>
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
                  count={rowCount}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[]}
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
        </section>
      </Loader>
    )
  }
}

export default withStyles(tableStyles)(TableList)
