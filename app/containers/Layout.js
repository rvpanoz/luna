/**
 * Layout component
 *
 */

import { remote, ipcRenderer } from 'electron'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { layoutStyles } from 'styles/layoutStyles'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import classnames from 'classnames'
import Grid from 'material-ui/Grid'
import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'common/Dialog'
import SnackBar from 'common/SnackBar'
import AppHeader from 'components/header/AppHeader'
import PackagesContainer from 'containers/Packages'

class Layout extends React.Component {
  constructor() {
    super()
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
  }
  handleSnackBarClose() {
    const { toggleSnackbar } = this.props
    toggleSnackbar(false)
  }
  render() {
    const {
      classes,
      menuOpen,
      snackbar,
      snackBarOpen,
      handleDrawerOpen,
      handleDrawerClose,
      handleDialogOpen,
      handleDialogClose,
      dialogOpen
    } = this.props

    return (
      <div className={classes.root}>
        <AppHeader
          menuOpen={menuOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          handleDialogOpen={handleDialogOpen}
        />
        <main className={classnames(classes.content, 'page-content')}>
          <PackagesContainer />
          {dialogOpen ? (
            <Dialog open={dialogOpen} handleDialogClose={handleDialogClose} />
          ) : null}
          <SnackBar
            snackBarOpen={snackBarOpen}
            handleSnackBarClose={this.handleSnackBarClose}
            actionText={snackbar.actionText}
            message={snackbar.message}
            position={snackbar.position}
          />
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    snackbar: state.global.snackbar,
    menuOpen: state.global.menuOpen,
    dialogOpen: state.global.dialogOpen,
    snackBarOpen: state.global.snackBarOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSnackbar: (bool) => dispatch(globalActions.toggleSnackbar(bool)),
    handleDrawerOpen: () => dispatch(globalActions.handleDrawer(true)),
    handleDrawerClose: () => dispatch(globalActions.handleDrawer(false)),
    handleDialogOpen: () => dispatch(globalActions.toggleDialog(true)),
    handleDialogClose: () => dispatch(globalActions.toggleDialog(false))
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default compose(
  withStyles(layoutStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Layout)
