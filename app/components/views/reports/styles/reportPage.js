import { flexContainer } from 'styles/variables';

const styles = theme => ({
  root: {
    ...flexContainer,
    padding: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topSection: {
    padding: theme.spacing.unit
  },
  bottomSection: {
    padding: theme.spacing.unit
  }
});

export default styles;
