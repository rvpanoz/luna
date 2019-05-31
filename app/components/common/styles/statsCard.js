export default theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: 250,
    height: 150
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontSize: 16,
    color: theme.palette.text.secondary,
    fontWeight: 700
  },
  value: {
    marginTop: theme.spacing.unit
  },
  iconWrapper: {
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
    borderRadius: '50%',
    display: 'inline-flex',
    height: 64,
    justifyContent: 'center',
    marginLeft: 'auto',
    width: 64
  },
  icon: {
    color: theme.palette.common.white,
    fontSize: 16,
    height: 32,
    width: 32
  },
  footer: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center'
  },
  difference: {
    alignItems: 'center',
    color: theme.palette.error.dark,
    display: 'inline-flex',
    fontWeight: 700
  },
  caption: {
    marginLeft: theme.spacing.unit
  }
});
