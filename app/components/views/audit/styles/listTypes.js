import { flexContainer } from 'styles/variables';

const styles = theme => ({
  container: {
    ...flexContainer,
    alignItems: 'center'
  },
  list: {
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
      maxHeight: 400
    }
  },
  dot: {
    marginLeft: theme.spacing.unit,
  }
});

export default styles;
