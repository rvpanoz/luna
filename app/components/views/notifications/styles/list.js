import { defaultFont, flexContainer, grayColor } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  paper: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  container: {
    width: '100%'
  },
  title: {
    display: 'flex',
    color: darken(grayColor, 0.2),
    flexDirection: 'column',
    justifyContent: 'flex-start'
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
    padding: theme.spacing.unit * 2 + 4
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
