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
    flex: '0 0 auto'
  },
  tabs: {
    flex: '1 0 auto'
  },
  column: {
    height: '100%'
  }
});

export default styles;
