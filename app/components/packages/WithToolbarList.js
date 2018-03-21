/**
 * HOC for List and ListHeader
 *
 **/

import { remote } from 'electron'
import {filter, contains} from 'ramda'
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
          '_uninstallSelected',
          'handleSort',
          'handleSelectAllClick',
          'handleUpdate',
          'handleReload',
          'handleGlobals',
          'handleUninstall',
          'isSelected',
          'showDetails',
          'doAction'
        ],
        this
      )
    }
    _uninstallSelected(selected) {
      const { mode, directory, packages, setTotal, clearSelected, setPackages } = this.props

      try {
        triggerEvent('uninstall-packages', {
          cmd: ['uninstall'],
          multiple: true,
          packages: selected,
          mode,
          directory
        })

        const packagesRemaining = filter(pkg=>!contains(pkg.name, selected))(packages)
        clearSelected()
        setPackages(packagesRemaining)
        setTotal(packagesRemaining.length)
      } catch (e) {
        throw new Error(e)
      }
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
    handleReload(e) {
      if (e) e.preventDefault()
      const { reload } = this.props
      reload()
      e.stopPropagation()
    }
    handleGlobals(e) {
      if (e) e.preventDefault()
      const { setGlobalMode } = this.props
      setGlobalMode()
      e.stopPropagation()
    }
    handleUninstall(e) {
      const {selected} = this.props
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
        );
      }
      return false;
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

    isSelected(name) {
      const { selected } = this.props
      return selected.indexOf(name) !== -1
    }
    render() {
      const {
        selected,
        loading,
        handleChangePage,
        handleChangeRowsPerPage,
        total,
        ...rest
      } = this.props
      const { title } = options

      return (
        <Paper style={{ width: '100%' }}>
          <TableListToolbar
            title={title}
            rowCount={total}
            selected={selected}
            loading={loading}
            handleReload={this.handleReload}
            handleUpdate={this.handleUpdate}
            handleGlobals={this.handleGlobals}
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
  selected: array,
  order: number,
  orderBy: string,
  rowCount: number
}

export default withToolbarTableList
