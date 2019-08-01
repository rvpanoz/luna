const styles = theme => ({
  wrapper: {
    width: '100%'
  },
  cardHeader: {
    padding: theme.spacing(1)
  },
  subheader: {
    paddingTop: theme.spacing(1)
  },
  cardContent: {
    maxHeight: 375,
    overflowY: 'scroll',
    overflowX: 'hidden',
    padding: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(1)
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default styles;
