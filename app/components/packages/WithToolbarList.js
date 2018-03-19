/**
 * HOC for List and ListHeader
 *
 **/

import { ipcRenderer } from 'electron'
import { autoBind, triggerEvent } from 'utils'
import Loader from 'common/Loader'
import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import TableListToolbar from './TableListToolbar'

function withToolbarTableList(List, options = {}) {
  return class WithToolbarList extends React.Component {
    constructor(props) {
      super(props)
      autoBind(
        [
          'handleSort',
          'handleChangePage',
          'handleChangeRowsPerPage',
          'handleSelectAllClick',
          'viewPackage',
          'isSelected',
          'showDetails',
          'handleClick',
          'doAction'
        ],
        this
      )
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
    handleSelectAllClick(e, checked) {
      const { packages, setSelectedPackage, clearSelected } = this.props
      if (checked) {
        packages.forEach((pkg) => setSelectedPackage(pkg.name, true))
      } else {
        clearSelected()
      }
    }
    handleSort(e, property) {
      const _orderBy = property
      const { packages, setPackages, orderBy, order } = this.props
      let _order = 'desc'

      if (orderBy === property && order === 'desc') {
        _order = 'asc'
      }

      const sortedPackages =
        _order === 'desc'
          ? packages.sort((a, b) => (b[_orderBy] < a[_orderBy] ? -1 : 1))
          : packages.sort((a, b) => (a[_orderBy] < b[_orderBy] ? -1 : 1))

      setPackages(sortedPackages, _order, _orderBy)
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
    isSelected(name) {
      const { selected } = this.props
      return selected.indexOf(name) !== -1
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
    doAction(e, action) {
      e.preventDefault()
      console.log(e)
      return false

      const {
        actions,
        mode,
        directory,
        version,
        active,
        toggleLoader,
        cmdOptions,
        setActive,
        setupSnackbar,
        toggleSnackbar
      } = this.props

      if (
        !action ||
        ['install', 'uninstall', 'update'].indexOf(action) === -1
      ) {
        throw new Error(`doAction: action ${action} is invalid`)
      }

      showMessageBox(
        {
          action: action,
          name: active.name,
          version: action === 'uninstall' ? null : version
        },
        () => {
          setActive(null)
          toggleLoader(true)
          triggerEvent(action, {
            mode,
            directory,
            cmd: [action === 'update' ? 'install' : action],
            pkgName: active.name,
            pkgVersion: action === 'uninstall' ? null : version,
            pkgOptions: cmdOptions
          })
        }
      )

      return false
    }
    render() {
      const {
        selected,
        loading,
        handleChangePage,
        handleChangeRowsPerPage,
        ...rest
      } = this.props
      const { title } = options

      return (
        <Paper style={{ width: '100%' }}>
          <TableListToolbar
            title={title}
            selected={selected}
            doAction={this.doAction}
            loading={loading}
          />
          <List
            handleSort={this.handleSort}
            handleClick={this.handleClick}
            handleSelectAllClick={this.handleSelectAllClick}
            showDetails={this.showDetails}
            isSelected={this.isSelected}
            viewPackage={this.viewPackage}
            handleChangePage={this.handleChangePage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            selected={selected}
            loading={loading}
            {...rest}
          />
        </Paper>
      )
    }
  }
}

const { bool, string, func, array, object, number } = PropTypes

withToolbarTableList.propTypes = {
  loading: string,
  toggleLoader: func.isRequired,
  toggleMainLoader: func.isRequired,
  mode: string.isRequired,
  total: number,
  directory: string,
  packages: array.isRequired,
  setPackages: func.isRequired,
  setPackageActions: func.isRequired,
  setGlobalMode: func.isRequired,
  setSelectedPackage: func.isRequired,
  clearSelected: func.isRequired,
  reload: func.isRequired,
  order: number,
  orderBy: string,
  rowCount: number
}

export default withToolbarTableList
