import { lighten } from '@material-ui/core';
import { grayColor } from 'styles/variables';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  dialogTitle: {
    fontSize: 22,
    color: grayColor,
  },
  closeButton: {
    textTransform: 'lowercase',
  },
  actions: {
    width: '100%',
  },
  flexGrow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  topbar: {
    zIndex: 'auto',
    boxShadow: 'none',
    backgroundColor: `${theme.palette.secondary.main} !important`,
  },
});

export default styles;
