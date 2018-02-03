/**
 * Packages Container Component - handles state.packages slice
 * pass state as props to children
 * */

import { remote, ipcRenderer } from 'electron'
import { parse } from '../utils'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { APP_MODES } from '../constants/AppConstants'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import { SnackbarContent } from 'material-ui/Snackbar'
import React from 'react'
import Grid from 'material-ui/Grid'
import PackagesList from '../components/packages/PackagesList'
import PackageContainer from './Package'

class PackagesContainer extends React.Component {
  constructor() {
    super()
    this._outdated = []
    this._autoBind([
      'fetch',
      'setGlobalMode',
      '_setupList',
      '_setupOutdated',
      '_viewPackage',
      '_clearUI'
    ])
  }
  componentDidMount() {
    const {
      setActive,
      toggleMainLoader,
      setMode,
      setPackages,
      toggleLoader,
      setPackageJSON
    } = this.props

    ipcRenderer.on('get-packages-close', (event, packages, command) => {
      if (!packages) {
        return
      }

      if (command === 'outdated') {
        this._setupOutdated(packages)
      } else {
        this._setupList(packages)
      }
      toggleLoader(false)
    })

    ipcRenderer.on('search-packages-close', (event, packagesStr) => {
      try {
        const packages = JSON.parse(packagesStr)
        setPackages(packages)
        toggleLoader(false)
      } catch (e) {
        throw new Error(e)
      }
    })

    ipcRenderer.on('view-package-close', (event, packageStr) => {
      let pkg
      try {
        pkg = JSON.parse(packageStr)
      } catch (e) {
        throw new Error(e)
      }

      if (pkg) {
        setActive(pkg)
        toggleMainLoader(false)
      } else {
        throw new Error('Package cannot be parsed')
      }
    })

    ipcRenderer.on('action-close', (event, pkg) => {
      const { mode, directory } = this.props
      if (mode === APP_MODES.LOCAL && directory) {
        ipcRenderer.send('analyze-json', directory)
        return
      }
      this.fetch()
    })

    ipcRenderer.on('ipcEvent-error', (event, error) => {
      // console.error(error)
    })

    ipcRenderer.on('analyze-json-close', (event, directory, content) => {
      setMode(APP_MODES.LOCAL, directory)
      setActive(null)
      setPackageJSON(content)
      toggleLoader(true)
      ipcRenderer.send('ipc-event', {
        ipcEvent: 'get-packages',
        cmd: ['outdated', 'list'],
        mode: APP_MODES.LOCAL,
        directory
      })
    })
  }
  _autoBind(handlers) {
    R.forEach((handler) => {
      if (typeof this[handler] === 'function') {
        this[handler] = this[handler].bind(this)
      }
    }, handlers)
  }
  _setupList(packages) {
    const outdated = this._outdated
    const { setPackages, setTotal, clearMessages } = this.props
    const packagesData = parse(packages, 'dependencies')

    const data = R.map((pkg) => {
      if (!pkg.from) return
      const pkgName = R.split('@')(pkg.from)[0]
      const outdatedPackage = R.prop(pkgName, outdated)

      if (outdatedPackage && typeof outdatedPackage === 'object') {
        return R.merge(pkg, {
          latest: outdatedPackage.latest
        })
      }
      return pkg
    }, packagesData)

    // update state
    setPackages(data)
    setTotal(data.length)
  }
  _viewPackage(name, version) {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'view-package',
      cmd: ['view'],
      pkgName: name,
      pkgVersion: version,
      mode: this.props.mode,
      directory: this.props.directory
    })
  }
  _clearUI() {
    const {
      setActive,
      setPackageActions,
      toggleMainLoader,
      clearMessages
    } = this.props
    setActive(null)
    clearMessages()
    setPackageActions()
    toggleMainLoader(false)
  }
  _setupOutdated(packages) {
    try {
      this._outdated = JSON.parse(packages)
    } catch (e) {
      throw new Error(e)
    }
  }
  componentWillUnMount() {
    alert(2)
    ipcRenderer.removeAllListeners([
      'get-packages-close',
      'search-packages-close',
      'action-close',
      'view-package-reply',
      'ipcEvent-error',
      'analyze-json-close'
    ])
  }
  render() {
    const {
      mode,
      directory,
      packages,
      setActive,
      setMode,
      toggleMainLoader
    } = this.props

    return (
      <Grid container justify="space-between">
        <Grid item xs={3}>
          <PackagesList
            packages={packages}
            toggleMainLoader={toggleMainLoader}
            setMode={setMode}
          />
        </Grid>
        <Grid item xs={6}>
          <PackageContainer />
        </Grid>
        <Grid item xs={3} />
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory,
    showModal: state.global.showModal,
    packages: state.packages.packages,
    active: state.packages.active
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPackages: (packages) => dispatch(packagesActions.setPackages(packages)),
    setPackageActions: (actions) =>
      dispatch(packagesActions.setPackageActions(actions)),
    setPackageJSON: (content) =>
      dispatch(globalActions.setPackageJSON(content)),
    setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
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
