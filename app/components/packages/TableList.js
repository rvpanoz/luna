/**
 * TableList component
 **/

import { autoBind, triggerEvent } from 'utils'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from 'material-ui/Table'

import Checkbox from 'material-ui/Checkbox'
import TableListHeader from './TableListHeader'
import infoColor from 'styles/variables'
import defaultFont from 'styles/variables'

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: 15
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  infoTableHeader: {
    color: infoColor
  },
  tableRow: {
    border: 'none',
    padding: theme.spacing.unit,
    lineHeight: '1.4',
    verticalAlign: 'middle',
    '&:hover': {
      color: infoColor,
      cursor: 'pointer',
      background: theme.palette.info.light
    }
  },
  tablelist: {
    visibility: 'visible',
    overflowX: 'hidden',
    overflowY: 'auto',
    clear: 'both',
    maxHeight: 850
  },
  table: {
    marginBottom: 0,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  tableHeadCell: {
    ...defaultFont,
    color: theme.palette.info.dark,
    fontSize: 12
  },
  tableCell: {
    ...defaultFont,
    lineHeight: '1.4em',
    padding: '12px 8px',
    verticalAlign: 'middle'
  }
})

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
    e.stopPropagation()
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
  viewPackage(e, name, version, mode, directory, repo, latest) {
    const { toggleMainLoader } = this.props

    if (e) {
      e.preventDefault()
    }

    toggleMainLoader(true)
    triggerEvent('view-package', {
      cmd: ['view'],
      pkgName: name,
      pkgVersion: version,
      latest,
      repo,
      mode,
      directory
    })

    return false
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
      <section className={classes.root}>
        <Table className={classes.tableResponsive}>
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
                      this.viewPackage(
                        e,
                        name,
                        _version,
                        mode,
                        directory,
                        repository,
                        latest
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
                    <TableCell padding="none" className={classes.tableCell}>
                      <span
                        style={{
                          display: 'inline-flex',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {name}
                      </span>
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {version}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {latest ? (
                        <span
                          style={{
                            color: 'red'
                          }}
                        >
                          {latest}
                        </span>
                      ) : (
                        version
                      )}
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
    )
  }
}

TableList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TableList)
