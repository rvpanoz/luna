import { flexContainer } from 'styles/variables';

const styles = theme => ({
  container: {
    ...flexContainer,
    alignItems: 'center'
  },
  list: {
    padding: theme.spacing.unit,
    overflowY: 'scroll',
    [theme.breakpoints.down('md')]: {
      maxHeight: 325
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: 500
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
