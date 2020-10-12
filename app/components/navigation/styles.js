import { flexContainer } from 'styles/variables';

const styles = (theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(1) - 3,
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
  },
  flexContainer: {
    ...flexContainer,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexGrow: {
    flexGrow: 1,
  },
});

export default styles;
