import { flexContainer } from 'styles/variables';

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    minWidth: 450,
    justifyContent: 'flex-end',
    padding: theme.spacing.unit * 2
  },
  list: {
    position: 'relative',
    minWidth: 450
  }
});

export default styles;
