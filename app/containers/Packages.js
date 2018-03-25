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
import Loader from 'common/Loader'
import withToolbarList from 'components/packages/WithToolbarList'
import PackageContainer from './Package'

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
    })

    ipcRenderer.on('search-packages-close', (event, packagesStr) => {
      try {
        const packages = JSON.parse(packagesStr)

        setPackages(packages)
        setTotal(packages.length)
        toggleLoader(false)
      } catch (e) {
        throw new Error(e)
      }
    })

    ipcRenderer.on('view-package-close', (event, packageStr) => {
      try {
        const pkg = JSON.parse(packageStr)
        setActive(pkg)
        toggleMainLoader(false)
      } catch (e) {
        throw new Error(e)
      }
    })

    ipcRenderer.on('update-package-close', (event, pkg) => {
      const { mode, directory } = this.props

      triggerEvent('get-packages', {
        cmd: ['outdated', 'list'],
        mode,
        directory
      })
    })

    ipcRenderer.on('action-close', (event, pkg) => {
      const { mode, directory } = this.props
      console.log(2, new Date())
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
      if (error) {
        // const errors = error.split('\n')
      }
    })

    ipcRenderer.on('analyze-json-close', (event, directory, content) => {
      toggleLoader(true)
      setMode(APP_MODES.LOCAL, directory)
      setActive(null)
      setPackageActions(null)
      setPackageJSON(content)
      setupSnackbar({
        action: true,
        actionText: 'global',
        message: directory
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
      'view-package-reply',
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
      <section>
        <Grid container>
          <Grid item xs={5} md={5} lg={4}>
            <WithToolbarList
              setGlobalMode={this.setGlobalMode}
              reload={this.reload}
              loading={loading}
              {...rest}
            />
          </Grid>
          <Grid item xs={7} md={7} lg={6}>
            <Loader loading={isLoading}>
              <PackageContainer />
            </Loader>
          </Grid>
        </Grid>
      </section>
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
