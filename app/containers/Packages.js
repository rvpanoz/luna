/**
 * Packages Container Component
 * */

import { remote, ipcRenderer } from 'electron'
import { autoBind, parse, triggerEvent } from '../utils'
import { connect } from 'react-redux'
import { APP_MODES } from 'constants/AppConstants'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import * as R from 'ramda'
import React from 'react'
import Grid from 'material-ui/Grid'
import TableList from 'components/packages/TableList'
import withToolbarList from 'components/packages/WithToolbarList'
import PackageContainer from './Package'
import Loader from 'common/Loader'

const WithToolbarList = withToolbarList(TableList, {
  title: 'Packages',
  dir: 'asc',
  sort: 'name'
})

class PackagesContainer extends React.Component {
  constructor() {
    super()
    autoBind(
      ['setupPackagesFromResponse', 'setupOutdated', 'setGlobalMode', 'reload'],
      this
    )
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
      setupSnackbar,
      toggleSnackbar,
      addMessage,
      clearMessages
    } = this.props

    ipcRenderer.on('install-packages-close', (event) => {
      const { mode, directory } = this.props

      triggerEvent('get-packages', {
        cmd: ['outdated', 'list'],
        mode,
        directory
      })
    })
    ipcRenderer.on('uninstall-packages-close', (event) => {
      const { mode, directory } = this.props

      triggerEvent('get-packages', {
        cmd: ['outdated', 'list'],
        mode,
        directory
      })
    })
    ipcRenderer.on('get-packages-close', (event, packages, command) => {
      console.log('get-package-close')
      if (!packages) {
        return
      }

      if (command[0] === 'outdated') {
        this.setupOutdated(packages)
      } else {
        this.setupPackagesFromResponse(packages)
      }

      setPackageActions(null)
      toggleMainLoader(false)
      toggleLoader(false)
      toggleSnackbar(false)
    })
    ipcRenderer.on('search-packages-close', (event, packagesStr) => {
      console.log('search-package-close')
      try {
        const packages = JSON.parse(packagesStr)

        setPage(0)
        setPackages(packages)
        setTotal(packages.length)
        toggleLoader(false)
      } catch (e) {
        throw new Error(e)
      }
    })
    ipcRenderer.on(
      'view-package-close',
      (event, data, command, latest, stats) => {
        console.log('view-package-close')

        try {
          let pkg = JSON.parse(data)
          console.log(pkg.version)
          if (latest) {
            pkg = R.merge(pkg, {
              latest
            })
          }

          if (stats) {
            const _stats = JSON.parse(stats)
            pkg = R.merge(pkg, {
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
    ipcRenderer.on('update-package-close', (event, pkg) => {
      console.log('update-package-close')
      const { mode, directory } = this.props

      triggerEvent('get-packages', {
        cmd: ['outdated', 'list'],
        mode,
        directory
      })
    })
    ipcRenderer.on('action-close', (event, pkg) => {
      console.log('action-close')
      const { mode, directory } = this.props

      if (mode === APP_MODES.LOCAL && directory) {
        ipcRenderer.send('analyze-json', directory)
      } else {
        triggerEvent('get-packages', {
          cmd: ['outdated', 'list'],
          mode,
          directory
        })
      }
    })
    ipcRenderer.on('ipcEvent-error', (event, error) => {
      const { setError, errors } = this.props
      console.error(error)
    })
    ipcRenderer.on('analyze-json-close', (event, directory, content) => {
      console.log('analyze-json-close')
      toggleLoader(true)
      setMode(APP_MODES.LOCAL, directory)
      setActive(null)
      setPackageActions(null)
      setPackageJSON(content)
      setupSnackbar({
        action: true,
        actionText: 'global',
        message: directory,
        position: {
          vertical: 'bottom',
          horizontal: 'center'
        }
      })
      toggleSnackbar(true)
      triggerEvent('get-packages', {
        cmd: ['outdated', 'list'],
        mode: APP_MODES.LOCAL,
        directory
      })
    })
  }
  componentDidUpdate(nextProps) {
    const { active, setVersion, clearMessages } = nextProps
    if (active && active.version) {
      setVersion(active.version)
    }
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners([
      'get-packages-close',
      'search-packages-close',
      'update-package-close',
      'action-close',
      'view-package-close',
      'ipcEvent-error',
      'analyze-json-close'
    ])
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
      setActive,
      setPackages,
      packagesOutdated,
      setTotal,
      addMessage,
      clearMessages
    } = this.props

    clearMessages()

    try {
      const data = parse(packages, 'dependencies')

      if (!data || !Array.isArray(data)) {
        throw new Error('Cannot parse packages')
      }

      const mappedPackages = data.map((pkg) => {
        const hasError = typeof pkg.error === 'object'

        if (hasError) {
          return R.merge(pkg, {
            _hasError: pkg.error
          })
        }

        const {
          name,
          version,
          peerMissing,
          required,
          missing,
          _from,
          link
        } = pkg
        let _hasPeerMissing = false
        const outdatedPackage = R.prop(name, packagesOutdated)

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
          return R.merge(pkg, {
            latest: outdatedPackage.latest,
            _hasPeerMissing
          })
        }
        return R.merge(pkg, {
          _hasPeerMissing
        })
      })

      const listPackages = R.filter((pkg) => {
        return !pkg._hasPeerMissing && !pkg._hasError
      }, mappedPackages)

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
    const { loading, isLoading, ...rest } = this.props

    return (
      <Loader loading={loading}>
        <Grid container alignItems="flex-start">
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <WithToolbarList
              setGlobalMode={this.setGlobalMode}
              reload={this.reload}
              loading={loading}
              {...rest}
            />
          </Grid>
          <Grid item xs={7} sm={7} md={7} lg={7}>
            <Loader loading={isLoading}>
              <PackageContainer isLoading={isLoading} loading={loading} />
            </Loader>
          </Grid>
        </Grid>
      </Loader>
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
    isLoading: state.packages.isLoading,
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
    setError: (error) => dispatch(packagesActions.setError(error)),
    setPage: (page) => dispatch(packagesActions.setPage(page)),
    setRowsPerPage: (rows) => dispatch(packagesActions.setRowsPerPage(rows)),
    setSelectedPackage: (pkgName, force) =>
      dispatch(packagesActions.setSelectedPackage(pkgName, force)),
    clearSelected: () => dispatch(packagesActions.clearSelected()),
    setupSnackbar: (snackbarOptions) =>
      dispatch(globalActions.setupSnackbar(snackbarOptions)),
    toggleSnackbar: (bool) => dispatch(globalActions.toggleSnackbar(bool)),
    setPackages: (packages, order, orderBy) =>
      dispatch(packagesActions.setPackages(packages, order, orderBy)),
    setPackageActions: (actions) =>
      dispatch(packagesActions.setPackageActions(actions)),
    setPackageJSON: (content) =>
      dispatch(globalActions.setPackageJSON(content)),
    setActive: (active) => dispatch(packagesActions.setActive(active)),
    setVersion: (version) => dispatch(packagesActions.setVersion(version)),
    toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool)),
    toggleModal: (bool) => dispatch(globalActions.toggleModal(bool)),
    setTotal: (total) => dispatch(packagesActions.setTotal(total)),
    toggleMainLoader: (bool) =>
      dispatch(packagesActions.toggleMainLoader(bool)),
    setMode: (mode, directory) =>
      dispatch(globalActions.setMode(mode, directory)),
    setPackagesOutdated: (packages) =>
      dispatch(packagesActions.setPackagesOutdated(packages)),
    addMessage: (level, message, requires, requiredBy) =>
      dispatch(globalActions.addMessage(level, message, requires, requiredBy)),
    clearMessages: () => dispatch(globalActions.clearMessages()),
    removePackages: (packages) =>
      dispatch(packagesActions.removePackages(packages))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer)
