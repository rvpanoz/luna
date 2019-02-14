const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing.unit * 3
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit,
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '50%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

export default styles;
