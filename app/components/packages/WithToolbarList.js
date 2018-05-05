/**
 * HOC for List and ListHeader
 *
 **/

import { APP_MODES, PACKAGE_GROUPS } from 'constants/AppConstants'
import { remote } from 'electron'
import { filter, contains } from 'ramda'
import { autoBind, triggerEvent } from 'utils'
import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import TableListToolbar from './TableListToolbar'
import Popover from 'material-ui/Popover'

function withToolbarTableList(List, options = {}) {
  return class WithToolbarList extends React.Component {
    constructor(props) {
      super(props)
      this._allPackages = null
      autoBind(
        [
          '_installSelected',
          '_uninstallSelected',
          'applyFilters',
          'handleSort',
          'handleSelectAllClick',
          'handleInstall',
          'handleReload',
          'handleGlobals',
          'handleFilters',
          'handleUninstall',
          'isSelected',
          'showDetails',
          'doAction'
        ],
        this
      )
    }
    _installSelected(selected) {
      const {
        mode,
        directory,
        toggleLoader,
        clearSelected,
        setPackages,
        setActive,
        setPackageActions
      } = this.props

      toggleLoader(true)
      setActive(null)
      setPackageActions([])
      clearSelected()
      setPackages([])

      try {
        triggerEvent('install-packages', {
          cmd: ['install'],
          multiple: true,
          packages: selected,
          mode,
          directory
        })
      } catch (e) {
        throw new Error(e)
      }
    }
    _uninstallSelected(selected) {
      const {
        mode,
        directory,
        packages,
        setTotal,
        clearSelected,
        setPackages,
        toggleLoader,
        setActive,
        setPackageActions
      } = this.props

      try {
        triggerEvent('uninstall-packages', {
          cmd: ['uninstall'],
          multiple: true,
          packages: selected,
          mode,
          directory
        })

        const packagesRemaining = filter(
          (pkg) => pkg && !contains(pkg.name, selected)
        )(packages)

        toggleLoader(true)
        setActive(null)
        setPackageActions([])
        clearSelected()
      } catch (e) {
        throw new Error(e)
      }
    }
    componentWillReceiveProps(nextProps) {
      const { loading, toggleSnackbar, packages } = nextProps

      if (loading) {
        toggleSnackbar(true, {
          loader: true,
          message: 'Loading packages'
        })
      } else if (packages && packages.length && this._allPackages === null) {
        this._allPackages = packages
      }
    }
    componentDidMount() {
      const { mode, directory, toggleLoader, toggleSnackbar } = this.props

      toggleLoader(true)
      triggerEvent('get-packages', {
        cmd: ['outdated', 'list'],
        mode,
        directory
      })
    }
    applyFilters(e) {
      const { packages, setPackages, filters } = this.props
      const groups = Object.keys(PACKAGE_GROUPS)
      const allPackages = [].concat(this._allPackages)

      let filteredPackages = []

      if (!filters.length) {
        setPackages(this._allPackages || [])
        return
      }

      filters.forEach((filterName) => {
        let prop
        if (groups.indexOf(filterName) > -1) {
          prop = '_group'
        }

        const filtered =
          allPackages &&
          allPackages.filter((pkg) => {
            if (prop) {
              return pkg[prop] === filterName
            }
            return !!pkg[filterName]
          })

        if (filtered && filtered.length) {
          setPackages(filtered)
        }
      })
    }
    handleReload(e) {
      if (e) e.preventDefault()

      const { reload } = this.props
      reload()
      e.stopPropagation()
    }
    handleUpdate(e) {
      const { selected } = this.props

      if (selected && selected.length) {
        remote.dialog.showMessageBox(
          remote.getCurrentWindow(),
          {
            title: 'Confirmation',
            type: 'question',
            message: 'Would you like to update the selected packages?',
            buttons: ['Cancel', 'Update']
          },
          (btnIdx) => {
            if (Boolean(btnIdx) === true) {
              this._installSelected(selected)
            }
          }
        )
      }
      return false
    }
    handleGlobals(e) {
      if (e) e.preventDefault()
      const { setGlobalMode } = this.props
      setGlobalMode()
      e.stopPropagation()
    }
    handleUninstall(e) {
      const { selected } = this.props
      if (selected && selected.length) {
        remote.dialog.showMessageBox(
          remote.getCurrentWindow(),
          {
            title: 'Confirmation',
            type: 'question',
            message: 'Would you like to uninstall the selected packages?',
            buttons: ['Cancel', 'Uninstall']
          },
          (btnIdx) => {
            if (Boolean(btnIdx) === true) {
              this._uninstallSelected(selected)
            }
          }
        )
      }
      return false
    }
    handleSelectAllClick(e, checked) {
      const { packages, setSelectedPackage, clearSelected } = this.props
      if (checked) {
        packages.forEach((pkg) => setSelectedPackage(pkg.name, true))
      } else {
        clearSelected()
      }
    }
    handleInstall(e) {
      const { selected, toggleLoader } = this.props
      if (selected && selected.length) {
        remote.dialog.showMessageBox(
          remote.getCurrentWindow(),
          {
            title: 'Confirmation',
            type: 'question',
            message: 'Would you like to install the selected packages?',
            buttons: ['Cancel', 'Install']
          },
          (btnIdx) => {
            if (Boolean(btnIdx) === true) {
              toggleLoader()
              this._installSelected(selected)
            }
          }
        )
      }
      return false
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
    isSelected(name) {
      const { selected } = this.props
      return selected.indexOf(name) !== -1
    }
    render() {
      const {
        mode,
        directory,
        selected,
        loading,
        handleChangePage,
        handleChangeRowsPerPage,
        total,
        toggleSnackbar,
        toggleFilters,
        packagesActions,
        rowsPerPage,
        showFilters,
        addFilter,
        filters,
        ...rest
      } = this.props
      const { title } = options

      function getStyles() {
        return loading ? { filter: 'blur(15px)' } : null
      }

      return (
        <Paper square style={getStyles()}>
          <TableListToolbar
            mode={mode}
            directory={directory}
            title={title}
            rowCount={total}
            selected={selected}
            loading={loading}
            showFilters={showFilters}
            filters={filters}
            addFilter={addFilter}
            toggleFilters={toggleFilters}
            packagesActions={packagesActions}
            applyFilters={this.applyFilters}
            handleReload={this.handleReload}
            handleUpdate={this.handleUpdate}
            handleGlobals={this.handleGlobals}
            handleInstall={this.handleInstall}
            handleUninstall={this.handleUninstall}
          />
          <List
            handleSort={this.handleSort}
            handleSelectAllClick={this.handleSelectAllClick}
            showDetails={this.showDetails}
            isSelected={this.isSelected}
            selected={selected}
            loading={loading}
            rowCount={total}
            rowsPerPage={rowsPerPage}
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
  packageJSON: object,
  directory: string,
  packages: array.isRequired,
  setPackages: func.isRequired,
  setPackageActions: func.isRequired,
  setGlobalMode: func.isRequired,
  setSelectedPackage: func.isRequired,
  clearSelected: func.isRequired,
  reload: func.isRequired,
  selected: array,
  order: number,
  orderBy: string,
  rowCount: number,
  rowsPerPage: number
}

export default withToolbarTableList
