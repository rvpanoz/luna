import { flexContainer } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%'
  },
  container: {
    ...flexContainer,
    display: 'flex',
    flexDirection: 'row',
    flexBasis: '100%',
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.unit
  },
  header: {
    flex: '0 0 auto',
    padding: theme.spacing.unit * 2 + 4
  },
  column: {
    height: '100%'
  }
});

export default styles;
