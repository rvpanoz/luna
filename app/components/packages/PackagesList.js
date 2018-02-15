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
import Loader from 'common/Loader'
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
    const { mode, directory, toggleLoader } = this.props
    toggleLoader(true)
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['outdated', 'list'],
      mode,
      directory
    })
  }

  componentDidMount() {
    this.getPackages()
  }

  render() {
    const {
      packages,
      total,
      classes,
      loading,
      mode,
      directory,
      toggleMainLoader,
      toggleLoader,
      setMode,
      setActive,
      setPackages
    } = this.props

    return (
      <section>
        <PackagesListHeader
          directory={directory}
          mode={mode}
          setMode={setMode}
          setActive={setActive}
          setPackages={setPackages}
          toggleLoader={toggleLoader}
          packages={packages}
          total={total}
        />
        <Loader loading={loading}>
          <section className={classes.list}>
            <List>
              {packages
                ? packages.map((pkg, idx) => {
                    if (!pkg) {
                      return
                    }
                    const { hasPeerMissing, readme, latest, version } = pkg
                    if (hasPeerMissing) {
                      return
                    }
                    const name = pkg.from ? pkg.from.split('@')[0] : pkg.name
                    return (
                      <PackageListItem
                        description={pkg.description ? pkg.description : null}
                        directory={directory}
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
          </section>
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
