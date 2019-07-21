import { flexContainer } from 'styles/variables';

const styles = theme => ({
  container: {
    ...flexContainer,
    alignItems: 'center'
  },
  list: {
    padding: theme.spacing.unit,
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 375
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: 400
    }
  },
  dot: {
    marginLeft: theme.spacing.unit,
  },
  chip: {
    fontSize: 20
  }
});

export default styles;
