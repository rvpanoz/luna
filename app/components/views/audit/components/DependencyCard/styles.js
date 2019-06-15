export default theme => ({
  root: {
    padding: theme.spacing.unit * 3
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    color: theme.palette.text.secondary,
    fontWeight: 700
  },
  value: {
    marginTop: theme.spacing.unit
  },
  iconWrapper: {
    alignItems: 'center',
    borderRadius: '50%',
    display: 'inline-flex',
    height: '4rem',
    justifyContent: 'center',
    marginLeft: 'auto',
    width: '4rem',
    fontSize: 24,
    color: theme.palette.common.white
  },
  primaryColor: {
    backgroundColor: theme.palette.primary.main
  },
  secondaryColor: {
    backgroundColor: theme.palette.secondary.main
  },
  warningColor: {
    backgroundColor: theme.palette.warning.main
  },
  errorColor: {
    backgroundColor: theme.palette.error.main
  },
  primaryTextColor: {
    color: theme.palette.primary.main
  },
  secondaryTextColor: {
    color: theme.palette.secondary.main
  },
  warningTextColor: {
    color: theme.palette.warning.main
  },
  errorTextColor: {
    color: theme.palette.error.main
  },
  icon: {
    color: theme.palette.common.white,
    fontSize: '2rem',
    height: '2rem',
    width: '2rem'
  },
  footer: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center'
  },
  difference: {
    alignItems: 'center',
    display: 'inline-flex',
    fontWeight: 700
  },
  caption: {
    marginLeft: theme.spacing.unit
  }
});
