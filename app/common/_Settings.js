/**
 * Settings
 **/

import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'material-ui/Modal'
import { styles } from './styles'

const Settings = (props) => {
  const { open, handleClose } = props

  function getModalStyles() {
    function rand() {
      return Math.floor(Math.random() * 20) - 10
    }

    const top = 50 + rand()
    const left = 50 + rand()

    return {
      position: 'absolute',
      width: 8 * 50,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #e5e5e5',
      backgroundColor: '#fff',
      boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
      padding: 8 * 4
    }
  }

  return (
    <div style={getModalStyles()}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div>
          this is a modal
          <SimpleModalWrapped />
        </div>
      </Modal>
    </div>
  )
}

const ModalWrapper = withStyles(styles)(Settings)
export default ModalWrapper
