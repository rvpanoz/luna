import React from 'react'
import { objectOf, string, bool, func, oneOfType } from 'prop-types'

import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from 'components/common';

const AppSnackbar = ({ snackbar, onClose }) => {
    const { open, type, message } = snackbar;

    return <Snackbar
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
        }}
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
        ClickAwayListenerProps={{
            onClickAway: onClose
        }}
    >
        <SnackbarContent
            variant={type}
            message={message}
            onClose={onClose}
        />
    </Snackbar>
}

AppSnackbar.propTypes = {
    classes: objectOf(string).isRequired,
    onClose: func.isRequired,
    snackbar: objectOf(oneOfType([string, bool])),
}

export default AppSnackbar
