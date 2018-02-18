/**
 * PackagesList
 *
 */

import { ipcRenderer } from 'electron'
import { withStyles } from 'material-ui/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { packagesListStyles } from '../../styles/components'
import classnames from 'classnames'
import React from 'react'
import Loader from 'common/Loader'
import ListItem from './ListItem'
import * as globalActions from 'actions/globalActions'
import List from 'material-ui/List'

class PackagesList extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {
      packages,
      classes,
      loading,
      mode,
      directory,
      toggleMainLoader,
      toggleLoader
    } = this.props

    return (
      <section>
        <Loader loading={loading}>
          <section className={classes.lcontainer}>
            <List className={classes.list}>
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
                      <ListItem
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

export default withStyles(packagesListStyles)(PackagesList)
