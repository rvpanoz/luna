import { flexContainer } from 'styles/variables';

const styles = theme => ({
  list: {
    width: '100%'
  },
  flexContainer: {
    ...flexContainer,
    padding: theme.spacing.unit * 2
  }
});

export default styles;
