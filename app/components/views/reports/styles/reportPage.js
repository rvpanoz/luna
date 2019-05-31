import { flexContainer } from 'styles/variables';

const styles = theme => ({
  root: {
    ...flexContainer,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexBasis: '100%',
    padding: theme.spacing.unit
  },
  topSection: {
    ...flexContainer,
    justifyContent: 'space-evenly',
    flex: 1,
    width: '100%',
    padding: theme.spacing.unit,
    overflow: 'hidden'
  },
  bottomSection: {
    width: '100%',
    padding: theme.spacing.unit,
    overflow: 'hidden'
  }
});

export default styles;
