/**
 * HOC for List and ListHeader
 *
 **/

import { ipcRenderer } from 'electron'
import { autoBind, triggerEvent } from 'utils'
import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import Header from './ListHeader'
import List from './List'

function withHeaderList(List, options = {}) {
  return class WithHeaderList extends React.Component {
    constructor(props) {
      super(props)
      autoBind(['sortBy'], this)
    }
    componentDidMount() {
      const { mode, directory, toggleLoader } = this.props

      toggleLoader(true)
      triggerEvent('get-packages', {
        cmd: ['outdated', 'list'],
        mode,
        directory
      })
    }
    sortBy(prop, dir) {
      const { packages, setPackages } = this.props

      const comparator = R.comparator((a, b) =>
        R.gt(R.propOr(R.F, prop, b), R.propOr(R.F, prop, a))
      )

      const sortedByLatest = R.sort(comparator, packages)
      setPackages(sortedByLatest)
    }
    render() {
      const { ...rest } = this.props
      const { title } = options

      return (
        <section>
          <Header title={title} sortBy={this.sortBy} {...rest} />
          <List {...rest} />
        </section>
      )
    }
  }
}

const { bool, string, func, array, object, number } = PropTypes

withHeaderList.propTypes = {
  loading: string,
  toggleLoader: func.isRequired,
  toggleMainLoader: func.isRequired,
  mode: string.isRequired,
  total: number,
  directory: string,
  packages: array.isRequired,
  setPackages: func.isRequired,
  setPackageActions: func.isRequired,
  setGlobalMode: func.isRequired,
  reload: func.isRequired
}

export default withHeaderList
