/**
 * Dialog component
 **/

import React from 'react'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'

class AlertDialog extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { open, handleDialogClose } = this.props

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Settings'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Settings are not available
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default AlertDialog
