const styles = theme => ({
  widgetWrapper: {
    display: 'flex',
    minHeight: '100%'
  },
  widgetHeader: {
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  widgetBody: {
    padding: theme.spacing.unit * 2
  },
  noPadding: {
    padding: 0
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden'
  },
  moreButton: {
    margin: -theme.spacing.unit,
    padding: 0,
    width: 40,
    height: 40,
    color: theme.palette.text.hint,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'rgba(255, 255, 255, 0.35)'
    }
  }
});

export default styles;
