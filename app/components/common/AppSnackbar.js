import React from 'react';
import { objectOf, string, bool, func, oneOfType, object } from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from 'components/common';

const AppSnackbar = ({ snackbar, onClose }) => {
  const { open, type, message, position } = snackbar;

  return (
    <Snackbar
      anchorOrigin={position}
      open={open}
      autoHideDuration={type === 'info' ? 3000 : null}
    >
      <SnackbarContent variant={type} message={message} onClose={onClose} />
    </Snackbar>
  );
};

AppSnackbar.propTypes = {
  onClose: func,
  snackbar: objectOf(oneOfType([string, bool, object])),
};

export default AppSnackbar;
