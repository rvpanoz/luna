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
import PropTypes from 'prop-types'
import Loader from 'common/Loader'
import ListItem from './ListItem'
import * as globalActions from 'actions/globalActions'
import List from 'material-ui/List'

class PackagesList extends React.Component {
  render() {
    const {
      packages,
      classes,
      loading,
      mode,
      directory,
      toggleMainLoader,
      toggleLoader,
      setSelectedPackage,
      selected,
      ...rest
    } = this.props

    return (
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
                      setSelectedPackage={setSelectedPackage}
                      selected={selected}
                      version={version}
                    />
                  )
                })
              : null}
          </List>
        </section>
      </Loader>
    )
  }
}

const { array, object, string, func, bool } = PropTypes

PackagesList.propTypes = {
  packages: array.isRequired,
  classes: object.isRequired,
  loading: bool.isRequired,
  mode: string.isRequired,
  toggleMainLoader: func.isRequired,
  toggleLoader: func.isRequired,
  directory: string
}

export default withStyles(packagesListStyles)(PackagesList)
