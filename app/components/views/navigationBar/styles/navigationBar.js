import { flexContainer } from 'styles/variables';

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  flexContainer: {
    ...flexContainer,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  flexGrow: {
    flexGrow: 1
  }
});

export default styles;
