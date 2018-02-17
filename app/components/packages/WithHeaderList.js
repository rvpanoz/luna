/**
HOC for List and ListHeader
**/

import { ipcRenderer } from 'electron'
import React from 'react'
import PropTypes from 'prop-types'
import Header from './ListHeader'
import List from './List'

function withHeaderList(List, options = {}) {
  return class WithHeaderList extends React.Component {
    constructor(props) {
      super(props)
    }
    componentDidMount() {
      const { mode, directory, toggleLoader } = this.props

      toggleLoader(true)
      ipcRenderer.send('ipc-event', {
        ipcEvent: 'get-packages',
        cmd: ['outdated', 'list'],
        mode,
        directory
      })
    }
    render() {
      const { loading, packages, toggleMainLoader, ...rest } = this.props
      const { title } = options

      return (
        <section>
          <Header {...rest} title={title} />
          <List
            packages={packages}
            loading={loading}
            toggleMainLoader={toggleMainLoader}
          />
        </section>
      )
    }
  }
}

export default withHeaderList
