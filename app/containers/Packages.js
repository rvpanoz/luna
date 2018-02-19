/**
 * Packages Container Component - handles state.packages slice
 * pass state as props to children
 * */

import { remote, ipcRenderer } from 'electron'
import { autoBind, parse } from '../utils'
import { connect } from 'react-redux'
import { APP_MODES } from 'constants/AppConstants'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import * as R from 'ramda'
import React from 'react'
import Loader from 'common/Loader'
import Grid from 'material-ui/Grid'
import List from 'components/packages/List'
import withHeaderList from '../components/packages/WithHeaderList'
import PackageContainer from './Package'
import SnackBar from '../common/SnackBar'

const WithHeaderList = withHeaderList(List, {
  title: 'Packages',
  dir: 'asc',
  sort: 'name'
})

class PackagesContainer extends React.Component {
  constructor() {
    super()
    autoBind(
      [
        'setupPackagesFromResponse',
        'setupOutdated',
        'setGlobalMode',
        'handleSnackBar',
        'handleSnackBarClose',
        'reload'
      ],
      this
    )
  }
  componentDidMount() {
    const {
      setActive,
      toggleMainLoader,
      setMode,
      setTotal,
      setPackages,
      toggleLoader,
      setPackageJSON,
      setupSnackbar,
      toggleSnackbar
    } = this.props

    ipcRenderer.on('get-packages-close', (event, packages, command) => {
      if (!packages) {
        return
      }

      if (command === 'outdated') {
        this.setupOutdated(packages)
      } else {
        this.setupPackagesFromResponse(packages)
      }

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

      ipcRenderer.send('ipc-event', {
        ipcEvent: 'get-packages',
        cmd: ['outdated', 'list'],
        mode,
        directory
      })
    })

    ipcRenderer.on('action-close', (event, pkg) => {
      const { mode, directory } = this.props

      ipcRenderer.send('ipc-event', {
        ipcEvent: 'get-packages',
        cmd: ['outdated', 'list'],
        mode,
        directory
      })
    })

    ipcRenderer.on('ipcEvent-error', (event, error) => {
      console.error(error)
    })

    ipcRenderer.on('analyze-json-close', (event, directory, content) => {
      toggleLoader(true)
      setMode(APP_MODES.LOCAL, directory)
      setActive(null)
      setPackageJSON(content)
      setupSnackbar({
        actionText: 'global',
        message: directory
      })
      toggleSnackbar(true)
      ipcRenderer.send('ipc-event', {
        ipcEvent: 'get-packages',
        cmd: ['outdated', 'list'],
        mode: APP_MODES.LOCAL,
        directory
      })
    })
  }
  setGlobalMode(directory) {
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
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['outdated', 'list'],
      mode: APP_MODES.GLOBAL
    })
  }
  reload(e) {
    const { mode, directory, toggleLoader } = this.props

    toggleLoader(true)
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['outdated', 'list'],
      mode,
      directory
    })
  }
  setupPackagesFromResponse(packages) {
    const {
      setActive,
      setPackages,
      packagesOutdated,
      setTotal,
      clearMessages
    } = this.props

    const packagesData = parse(packages, 'dependencies')
    const data = R.map((pkg) => {
      if (!pkg.from) return
      const pkgName = R.split('@')(pkg.from)[0]
      const outdatedPackage = R.prop(pkgName, packagesOutdated)

      if (
        outdatedPackage &&
        typeof outdatedPackage === 'object' &&
        pkg.version !== outdatedPackage.latest
      ) {
        const _pkg = R.merge(pkg, {
          latest: outdatedPackage.latest
        })
        return _pkg
      }

      return pkg
    }, packagesData)

    setPackages(data)
    setTotal(data.length)
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
  handleSnackBarClose() {
    const { toggleSnackbar } = this.props
    toggleSnackbar(false)
  }
  render() {
    const {
      toggleLoader,
      toggleMainLoader,
      setPackages,
      mode,
      total,
      loading,
      isLoading,
      directory,
      packages,
      snackBarOpen,
      snackbar,
      ...rest
    } = this.props

    return (
      <section>
        <Grid container>
          <Grid item xs={4} md={4} lg={4}>
            <WithHeaderList
              loading={loading}
              toggleLoader={toggleLoader}
              toggleMainLoader={toggleMainLoader}
              mode={mode}
              total={total}
              directory={directory}
              packages={packages}
              setPackages={setPackages}
              setGlobalMode={this.setGlobalMode}
              reload={this.reload}
            />
          </Grid>
          <Grid item xs={8}>
            <Loader loading={isLoading}>
              <PackageContainer />
            </Loader>
          </Grid>
        </Grid>
        {snackbar ? (
          <SnackBar
            snackBarOpen={snackBarOpen}
            handleSnackBarClose={this.handleSnackBarClose}
            action={this.setGlobalMode}
            actionText={snackbar.actionText}
            message={snackbar.message}
          />
        ) : null}
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.global.loading,
    isLoading: state.packages.isLoading,
    mode: state.global.mode,
    directory: state.global.directory,
    showModal: state.global.showModal,
    packages: state.packages.packages,
    packagesOutdated: state.packages.outdated,
    active: state.packages.active,
    total: state.packages.total,
    snackBarOpen: state.global.snackBarOpen,
    snackbar: state.global.snackbar
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setupSnackbar: (snackbarOptions) =>
      dispatch(globalActions.setupSnackbar(snackbarOptions)),
    toggleSnackbar: (bool) => dispatch(globalActions.toggleSnackbar(bool)),
    setPackages: (packages) => dispatch(packagesActions.setPackages(packages)),
    setPackageActions: (actions) =>
      dispatch(packagesActions.setPackageActions(actions)),
    setPackageJSON: (content) =>
      dispatch(globalActions.setPackageJSON(content)),
    setActive: (active) => dispatch(packagesActions.setActive(active)),
    toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool)),
    toggleModal: (bool) => dispatch(globalActions.toggleModal(bool)),
    setTotal: (total) => dispatch(packagesActions.setTotal(total)),
    toggleMainLoader: (bool) =>
      dispatch(packagesActions.toggleMainLoader(bool)),
    setMode: (mode, directory) =>
      dispatch(globalActions.setMode(mode, directory)),
    setPackagesOutdated: (packages) =>
      dispatch(packagesActions.setPackagesOutdated(packages)),
    addMessage: (level, message) =>
      dispatch(globalActions.addMessage(level, message)),
    clearMessages: () => dispatch(globalActions.clearMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer)
