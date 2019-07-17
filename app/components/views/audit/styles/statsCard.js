const styles = theme => ({
  root: {
    width: '100%'
  },
  container: {
    padding: theme.spacing.unit * 3,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing.unit,
    justifyContent: 'space-between'
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3
  },
  top: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  bottom: {},
  topContainer: {
    display: 'flex',
    alignItems: 'baseline'
  }
});

export default styles;
