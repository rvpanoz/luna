const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.light
  },
  info: {
    backgroundColor: theme.palette.secondary.light
  },
  warning: {
    backgroundColor: amber[700]
  },
  primary: {
    backgroundColor: 'transparent'
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
