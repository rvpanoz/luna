const styles = theme => ({
  root: {
    minWidth: 400,
    padding: theme.spacing.unit,
    '& > h2': {
      color: theme.palette.primary.dark,
      fontSize: 18
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  flexContainer: { display: 'flex' },
  filterItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing.unit
  },
  bottomDivider: {
    margin: theme.spacing.unit
  },
  hidden: {
    display: 'none'
  }
});

export default styles;
