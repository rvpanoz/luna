/**
 * Packages Container Component - handles state.packages slice
 * pass state as props to children
 **/

'use strict'

import { remote, ipcRenderer } from 'electron'
import React from 'react'
import { parse } from '../utils'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { APP_MODES } from '../constants/AppConstants'
import * as globalActions from '../actions/global_actions'
import * as packagesActions from '../actions/packages_actions'

//components
import PackagesListHeader from '../components/packages/PackagesListHeader'
import PackagesListSearch from '../components/packages/PackagesListSearch'
import PackagesList from '../components/packages/PackagesList'
import PackageContainer from '../containers/PackageContainer'

class PackagesContainer extends React.Component {
  constructor(props) {
    super(props)
    this._autoBind([
      'loadData',
      '_setupList',
      '_setupOutdated',
      '_viewPackage',
      '_clearUI'
    ])
  }

  _autoBind(handlers) {
    R.forEach((handler) => {
      if (typeof this[handler] === 'function') {
        this[handler] = this[handler].bind(this)
      }
    }, handlers)
  }

  // parse packages string and set list packages
  _setupList(packages) {
    let total = 0
    let packagesData = parse(packages, 'dependencies')
    this.props.setPackages(packagesData)

    // clear notifications
    this.props.clearMessages()

    // set total installed packages
    total = packagesData.filter((pkg, idx) => {
      return !pkg.peerMissing && pkg.from
    }).length

    // update totals
    this.props.setTotalInstalled(total)

    // setup notifications
    let notifications = parse(packages, 'problems')
    notifications.forEach((notification, idx) => {
      this.props.addMessage('error', notification)
    })
  }

  // parse and set outdated packages
  _setupOutdated(packages) {
    if (!packages) {
      this.props.setPackagesOutdated([])
      return
    }
    let outdatedData = JSON.parse(packages)
    this.props.setPackagesOutdated(outdatedData)
  }

  // send ipcRenderer event to view package
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
    let { showModal } = this.props
    this.props.setActive(null)
    this.props.setPackageActions()
    this.props.setPackagesOutdated([])
    this.props.toggleMainLoader(false)
    this.props.toggleLoader(true)
    if (showModal) {
      this.props.toggleModal(false)
    }
  }

  // sent ipcRenderer event to load packages
  loadData() {
    this._clearUI()
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['list', 'outdated'],
      mode: this.props.mode,
      directory: this.props.directory
    })
  }

  componentDidMount() {
    //  npm list && npm outdated
    this.loadData()

    //  npm list && npm outdated listener
    ipcRenderer.on('get-packages-close', (event, packages, command) => {
      if (!packages) {
        return
      }
      switch (command) {
        case 'outdated':
          this._setupOutdated(packages)
          break
        default:
          this._setupList(packages)
      }

      // close loader
      this.props.toggleLoader(false)
    })

    //  npm search listener
    ipcRenderer.on('search-packages-close', (event, packagesStr) => {
      let packages = JSON.parse(packagesStr)
      this.props.setPackages(packages)
      this.props.toggleLoader(false)
    })

    //  npm view listener
    ipcRenderer.on('view-package-close', (event, packageStr) => {
      let pkg
      try {
        pkg = JSON.parse(packageStr)
      } catch (e) {
        console.error(e)
      }

      if (pkg) {
        this.props.setActive(pkg)
        this.props.toggleMainLoader(false)
      } else {
        throw new Error('Package cannot be parsed')
      }
    })

    // npm install | uninstall | update listener
    ipcRenderer.on('action-close', (event, pkg) => {
      let mode = this.props.mode,
        directory = this.props.directory
      if (mode === APP_MODES.LOCAL && directory) {
        ipcRenderer.send('analyze-json', directory)
        return
      }
      this.loadData()
    })

    ipcRenderer.on('ipcEvent-error', (event, error) => {
      // console.error(error);
    })

    // update packageJSON state object and load data
    ipcRenderer.on('analyze-json-close', (event, filePath, content) => {
      this.props.setPackageJSON(content)
      this.props.toggleLoader(true)

      //TODO: ... remove setTimeout
      setTimeout(() => {
        this.loadData()
      }, 3000)
    })
  }

  componentWillUnMount() {
    // remove listeners
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
    let props = this.props

    return (
      <div className="packages">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <PackagesListHeader
              mode={props.mode}
              directory={props.directory}
              total={props.totalInstalled}
              loadData={this.loadData}
              toggleLoader={props.toggleLoader}
              setMode={props.setMode}
              setActive={props.setActive}
              setPackageActions={props.setPackageActions}
            />
            <PackagesListSearch
              setActive={props.setActive}
              toggleLoader={props.toggleLoader}
              mode={props.mode}
              directory={props.directory}
              setPackageActions={props.setPackageActions}
            />
            <PackagesList
              loading={props.loading}
              packages={props.packages}
              toggleLoader={props.toggleLoader}
              setActive={props.setActive}
              toggleMainLoader={props.toggleMainLoader}
            />
          </div>
          <div className="col-lg-8 col-md-8">
            <PackageContainer />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory,
    loading: state.global.loading,
    showModal: state.global.showModal,
    packages: state.packages.packages,
    active: state.packages.active,
    totalInstalled: state.packages.total
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
    toggleMainLoader: (bool) =>
      dispatch(packagesActions.toggleMainLoader(bool)),
    setMode: (mode) => dispatch(globalActions.setMode(mode)),
    setPackagesOutdated: (packages) =>
      dispatch(packagesActions.setPackagesOutdated(packages)),
    setTotalInstalled: (total) =>
      dispatch(packagesActions.setTotalInstalled(total)),
    addMessage: (level, message) =>
      dispatch(globalActions.addMessage(level, message)),
    clearMessages: () => dispatch(globalActions.clearMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer)
