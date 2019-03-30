import { defaultFont, flexContainer } from 'styles/variables';

const styles = theme => ({
  paper: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  container: {
    width: '100%'
  },
  list: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      maxHeight: 500
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 750
    }
  },
  flexContainer: {
    ...flexContainer,
    justifyContent: 'space-between'
  },
  header: {
    flex: '0 0 auto',
    padding: theme.spacing.unit + 4
  },
  divider: {
    marginBottom: theme.spacing.unit
  },
  avatar: {
    backgroundColor: '#fff'
  },
  withPadding: {
    padding: theme.spacing.unit + 4
  },
  item: {
    ...defaultFont
  }
});

export default styles;
