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
    paddingLeft: theme.spacing(1) / 2,
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
  },
});

export default styles;
