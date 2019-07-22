import { flexContainer, grayColor } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    width: '100%'
  },
  container: {
    width: '100%'
  },
  flexContainer: {
    ...flexContainer,
    justifyContent: 'space-between'
  },
  header: {
    flex: '0 0 auto',
    padding: theme.spacing.unit * 2 + 4
  },
  title: {
    display: 'flex',
    color: darken(grayColor, 0.2),
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  divider: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  wrapper: {
    padding: theme.spacing.unit,
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 375
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: 450
    }
  },
  topSection: {
    ...flexContainer,
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    padding: theme.spacing.unit * 2
  },
  bottomSection: {
    ...flexContainer,
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing.unit * 2
  }
});

export default styles;
