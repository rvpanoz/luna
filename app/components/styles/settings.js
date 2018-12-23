const styles = theme => ({
  paper: {
    width: '100%',
    height: '100%'
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
