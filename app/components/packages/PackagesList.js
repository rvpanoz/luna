/**
 * PackagesList
 *
 */

import { ipcRenderer } from 'electron'
import { withStyles } from 'material-ui/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { packagesListStyles } from '../styles'
import React from 'react'
import Loader from '../../common/Loader'
import PackageListItem from './PackagesListItem'
import * as globalActions from 'actions/globalActions'
import List from 'material-ui/List'
import PackagesListHeader from './PackagesListHeader'

class PackagesList extends React.Component {
  constructor() {
    super()
    this.getPackages = this.getPackages.bind(this)
  }

  getPackages() {
    const { mode, directory } = this.props

    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['outdated', 'list'],
      mode,
      directory
    })
  }

  componentDidMount() {
    const { toggleLoader } = this.props
    toggleLoader(true)
    this.getPackages()
  }

  render() {
    const {
      packages,
      total,
      loading,
      mode,
      directory,
      toggleMainLoader,
      toggleLoader,
      setMode
    } = this.props

    return (
      <section>
        <PackagesListHeader
          directory={directory}
          mode={mode}
          setMode={setMode}
          toggleLoader={toggleLoader}
          total={total}
        />
        <Loader loading={loading}>
          <List>
            {packages
              ? packages.map((pkg, idx) => {
                  if (!pkg) {
                    return
                  }
                  const hasPeerMissing = pkg.peerMissing
                  if (hasPeerMissing) {
                    return
                  }
                  const version = pkg.version
                  const readme = pkg.readme
                  const name = pkg.from ? pkg.from.split('@')[0] : pkg.name
                  const latest = pkg.latest
                  return (
                    <PackageListItem
                      description={pkg.description ? pkg.description : null}
                      directory={directory}
                      idx={idx}
                      key={idx}
                      latest={latest}
                      mode={mode}
                      name={name}
                      readme={readme}
                      toggleMainLoader={toggleMainLoader}
                      version={version}
                    />
                  )
                })
              : null}
          </List>
        </Loader>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.global.loading,
    total: state.packages.total,
    mode: state.global.mode,
    directory: state.global.directory
  }
}

function mapDispatchToProps(dispatch) {
  return { toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool)) }
}

export default compose(
  withStyles(packagesListStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PackagesList)
