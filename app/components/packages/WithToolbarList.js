/**
 * HOC for List and ListHeader
 *
 **/

import { ipcRenderer } from 'electron'
import { autoBind, triggerEvent } from 'utils'
import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import TableListToolbar from './TableListToolbar'

function withToolbarTableList(List, options = {}) {
  return class WithToolbarList extends React.Component {
    constructor(props) {
      super(props)
      this.handleSort = this.handleSort.bind(this)
      this.handleSelectAllClick = this.handleSelectAllClick.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.isSelected = this.isSelected.bind(this)
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
    handleSelectAllClick(e, checked) {
      if (checked) {
        // this.setState({
        //   selected: this.state.data.map(n => n.id)
        // });
        // return;
      }
      // this.setState({ selected: [] });
    }
    handleSort(e, property) {
      const _orderBy = property
      const { packages, setPackages, orderBy, order } = this.props
      let _order = 'desc'

      if (orderBy === property && order === 'desc') {
        _order = 'asc'
      }

      const sortedPackages =
        _order === 'desc'
          ? packages.sort((a, b) => (b[_orderBy] < a[_orderBy] ? -1 : 1))
          : packages.sort((a, b) => (a[_orderBy] < b[_orderBy] ? -1 : 1))

      setPackages(sortedPackages, _order, _orderBy)
    }
    handleClick(e, name) {
      const { selected, setSelectedPackage } = this.props
      const selectedIndex = selected.indexOf(name)

      if (selectedIndex === -1) {
        setSelectedPackage(name)
      }
    }
    handleChangePage(e, page) {
      this.setState({ page })
    }
    handleChangeRowsPerPage(e) {
      this.setState({ rowsPerPage: event.target.value })
    }
    isSelected(name) {
      const { selected } = this.props

      return selected.indexOf(name) !== -1
    }
    render() {
      const { selected, ...rest } = this.props
      const { title } = options

      return (
        <Paper style={{ width: '100%' }}>
          <TableListToolbar title={title} selected={selected} />
          <List
            handleSort={this.handleSort}
            handleClick={this.handleClick}
            handleSelectAllClick={this.handleSelectAllClick}
            isSelected={this.isSelected}
            selected={selected}
            {...rest}
          />
        </Paper>
      )
    }
  }
}

const { bool, string, func, array, object, number } = PropTypes

withToolbarTableList.propTypes = {
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
  reload: func.isRequired,
  order: number,
  orderBy: string,
  rowCount: number
}

export default withToolbarTableList
