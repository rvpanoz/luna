/**
 * Packages Container Component
 * */

import { ipcRenderer } from 'electron'
import { autoBind, parse, triggerEvent } from 'utils'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withStyles } from 'material-ui/styles'
import { APP_MODES, PACKAGE_GROUPS } from 'constants/AppConstants'
import {
  addFilter,
  clearFilters,
  clearSelected,
  setError,
  setTotal,
  setPage,
  setRowsPerPage,
  setSelectedPackage,
  setPackages,
  setPackageActions,
  setActive,
  setVersion,
  setPackagesOutdated,
  toggleMainLoader,
  toggleFilters
} from 'actions/packagesActions'
import {
  addMessage,
  clearMessages,
  removePackages,
  toggleLoader,
  toggleModal,
  setMode,
  setPackageJSON,
  setOpenedPackages
} from 'actions/globalActions'
import { filter as Rfilter, merge as Rmerge, prop as Rprop } from 'ramda'
import React from 'react'
import Grid from 'material-ui/Grid'
import TableList from 'components/packages/TableList'
import withToolbarList from 'components/packages/WithToolbarList'
import PackageContainer from './Package'

const styles = (theme) => {
  return {
    root: {
      margin: '0 auto'
    }
  }
}

const WithToolbarList = withToolbarList(TableList, {
  title: 'Packages',
  dir: 'asc',
  sort: 'name'
})

const ipcListeners = [
  'install-packages-close',
  'uninstall-packages-close',
  'get-packages-close',
  'search-packages-close',
  'view-package-close',
  'action-close',
  'ipcEvent-error',
  'analyze-json-close'
]

class PackagesContainer extends React.Component {
  constructor() {
    super()
    autoBind(
      [
        'listPackages',
        'reload',
        'setupPackagesFromResponse',
        'setupOutdated',
        'setGlobalMode'
      ],
      this
    )
  }
  listPackages(event, opts) {
    const { mode, directory } = this.props

    triggerEvent('get-packages', {
      cmd: ['outdated', 'list'],
      mode,
      directory
    })
  }
  componentDidMount() {
    const {
      setActive,
      mode,
      directory,
      toggleMainLoader,
      setMode,
      setTotal,
      setPage,
      setPackages,
      setPackageActions,
      toggleLoader,
      setPackageJSON,
      toggleSnackbar,
      addMessage,
      clearMessages,
      setOpenedPackages
    } = this.props

    ipcRenderer.on('install-packages-close', this.listPackages)
    ipcRenderer.on('uninstall-packages-close', this.listPackages)
    ipcRenderer.on('get-packages-close', (event, packages, command) => {
      if (!packages) {
        return
      }

      if (command[0] === 'outdated') {
        this.setupOutdated(packages)
      } else {
        this.setupPackagesFromResponse(packages)
      }

      setActive(null)
      setPackageActions(null)
      toggleMainLoader(false)
      toggleLoader(false)
      toggleSnackbar(false)
    })
    ipcRenderer.on('search-packages-close', (event, packagesStr) => {
      try {
        const packages = JSON.parse(packagesStr)

        setActive(null)
        setPage(0)
        setPackages(packages)
        setTotal(packages.length)
        toggleLoader(false)
        toggleSnackbar(false)
      } catch (e) {
        throw new Error(e)
      }
    })
    ipcRenderer.on(
      'view-package-close',
      (event, data, command, latest, stats) => {
        try {
          let pkg = JSON.parse(data)

          if (latest) {
            pkg = Rmerge(pkg, {
              latest
            })
          }

          if (stats) {
            const _stats = JSON.parse(stats)
            pkg = Rmerge(pkg, {
              stats: _stats
            })
          }

          setActive(pkg)
          toggleMainLoader(false)
        } catch (e) {
          throw new Error(e)
        }
      }
    )
    ipcRenderer.on('action-close', (event, pkg) => {
      const { mode, directory } = this.props

      if (mode === APP_MODES.LOCAL && directory) {
        ipcRenderer.send('analyze-json', directory)
      } else {
        this.listPackages(event)
      }
    })
    ipcRenderer.on('ipcEvent-error', (event, error) => {
      console.error(error)
    })
    ipcRenderer.on(
      'analyze-json-close',
      (event, directory, content, openedPackages) => {
        setActive(null)
        setPackageActions(null)
        toggleLoader(true)

        if (directory) {
          setMode(APP_MODES.LOCAL, directory)
          setPackageJSON(content)
        }

        if (openedPackages) {
          setOpenedPackages(openedPackages)
        }

        triggerEvent('get-packages', {
          cmd: ['outdated', 'list'],
          mode: APP_MODES.LOCAL,
          directory
        })
      }
    )
  }
  componentWillUnmount() {
    try {
      ipcListeners.forEach((eventName) => ipcRenderer.removeListener(eventName))
    } catch (e) {
      throw new Error(e)
    }
  }
  setGlobalMode() {
    const {
      toggleLoader,
      setPackages,
      toggleSnackbar,
      setActive,
      setMode
    } = this.props

    setPackages([])
    toggleSnackbar(false)
    toggleLoader(true)
    setActive(null)
    setMode(APP_MODES.GLOBAL)
    triggerEvent('get-packages', {
      cmd: ['outdated', 'list'],
      mode: APP_MODES.GLOBAL
    })
  }
  setupPackagesFromResponse(packages) {
    const {
      mode,
      directory,
      setActive,
      setPackages,
      packagesOutdated,
      packageJSON,
      setTotal,
      addMessage,
      clearMessages
    } = this.props

    try {
      const data = parse(packages, 'dependencies')

      if (!data || !Array.isArray(data)) {
        throw new Error('Cannot parse packages')
      }

      const mappedPackages = data.map((pkg) => {
        const hasError = typeof pkg.error === 'object'
        const name = pkg.name
        let _group = null,
          _hasPeerMissing = false

        //find group and attach to pkg, useful to show data in list
        if (mode === APP_MODES.LOCAL && typeof packageJSON === 'object') {
          let found = false

          Object.keys(PACKAGE_GROUPS).some((groupName, idx) => {
            found = packageJSON[groupName] && packageJSON[groupName][name]
            if (found) {
              _group = groupName
            }

            return found
          })
        }

        if (hasError) {
          return Rmerge(pkg, {
            _hasError: pkg.error
          })
        }

        const { version, peerMissing, required, missing, _from, link } = pkg
        const outdatedPackage = Rprop(name, packagesOutdated)

        if (peerMissing && Array.isArray(peerMissing)) {
          _hasPeerMissing = true
          peerMissing.forEach((pm) => {
            addMessage(
              'error',
              `Package ${pm['requiredBy']} requires ${pm['requires']}`,
              pm['requires'],
              pm['requiredBy']
            )
          })
        }

        if (
          outdatedPackage &&
          typeof outdatedPackage === 'object' &&
          version !== outdatedPackage.latest
        ) {
          return Rmerge(pkg, {
            _group,
            _hasPeerMissing,
            latest: outdatedPackage.latest
          })
        }

        return Rmerge(pkg, {
          _group,
          _hasPeerMissing
        })
      })

      const listPackages = Rfilter((pkg) => {
        return !pkg._hasPeerMissing && !pkg._hasError
      }, mappedPackages)

      clearMessages()
      setPackages(listPackages, 'asc', 'name')
      setTotal(listPackages.length)
    } catch (e) {
      throw new Error(e)
    }
  }
  setupOutdated(packages) {
    const { setPackagesOutdated } = this.props
    try {
      const packagesOutdated = JSON.parse(packages)
      setPackagesOutdated(packagesOutdated)
    } catch (e) {
      throw new Error(e)
    }
  }
  reload(e) {
    const { mode, directory, toggleLoader, setActive } = this.props

    toggleLoader(true)
    setActive(null)
    triggerEvent('get-packages', {
      cmd: ['outdated', 'list'],
      mode,
      directory
    })
  }
  render() {
    const {
      classes,
      loading,
      isLoading,
      filters,
      settings,
      ...rest
    } = this.props

    return (
      <Grid
        className={classes.root}
        container
        spacing={8}
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={5} md={5} lg={5} xl={4}>
          <WithToolbarList
            setGlobalMode={this.setGlobalMode}
            reload={this.reload}
            clearFilters={this.clearFilters}
            loading={loading}
            filters={filters}
            {...rest}
          />
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7} xl={8}>
          <PackageContainer
            isLoading={isLoading}
            loading={loading}
            settings={settings}
            {...rest}
          />
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    snackBarOpen: state.global.snackBarOpen,
    loading: state.global.loading,
    mode: state.global.mode,
    directory: state.global.directory,
    showModal: state.global.showModal,
    showFilters: state.packages.showFilters,
    showDetails: state.packages.showDetails,
    filters: state.packages.filters,
    packages: state.packages.packages,
    selected: state.packages.selected,
    packageJSON: state.global.packageJSON,
    packagesOutdated: state.packages.outdated,
    active: state.packages.active,
    total: state.packages.total,
    orderBy: state.packages.orderBy,
    order: state.packages.order,
    page: state.packages.page,
    rowsPerPage: state.packages.rowsPerPage,
    packagesActions: state.packages.actions,
    errors: state.packages.errors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setError: (error) => dispatch(setError(error)),
    setPage: (page) => dispatch(setPage(page)),
    setRowsPerPage: (rows) => dispatch(setRowsPerPage(rows)),
    setSelectedPackage: (pkgName, force) =>
      dispatch(setSelectedPackage(pkgName, force)),
    clearFilters: () => dispatch(clearFilters()),
    clearSelected: () => dispatch(clearSelected()),
    setPackages: (packages, order, orderBy) =>
      dispatch(setPackages(packages, order, orderBy)),
    setPackageActions: (actions) => dispatch(setPackageActions(actions)),
    setPackageJSON: (content) => dispatch(setPackageJSON(content)),
    setOpenedPackages: (packages) => dispatch(setOpenedPackages(packages)),
    setActive: (active) => dispatch(setActive(active)),
    setVersion: (version) => dispatch(setVersion(version)),
    toggleLoader: (bool) => dispatch(toggleLoader(bool)),
    toggleModal: (bool) => dispatch(toggleModal(bool)),
    toggleFilters: (bool) => dispatch(toggleFilters(bool)),
    setTotal: (total) => dispatch(setTotal(total)),
    toggleMainLoader: (bool) => dispatch(toggleMainLoader(bool)),
    setMode: (mode, directory) => dispatch(setMode(mode, directory)),
    setPackagesOutdated: (packages) => dispatch(setPackagesOutdated(packages)),
    addMessage: (level, message, requires, requiredBy) =>
      dispatch(addMessage(level, message, requires, requiredBy)),
    addFilter: (filterName) => dispatch(addFilter(filterName)),
    clearMessages: () => dispatch(clearMessages()),
    removePackages: (packages) => dispatch(removePackages(packages))
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PackagesContainer)
