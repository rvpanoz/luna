import { flexContainer } from 'styles/variables';

const styles = theme => ({
  container: {
    ...flexContainer,
    flexFlow: 1
  },
  dotPrimary: {
    color: theme.palette.primary.main
  }
});

export default styles;
