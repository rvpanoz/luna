import { flexContainer } from 'styles/variables';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1) / 1.5,
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex: {
    ...flexContainer,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  project: {
    padding: theme.spacing(1),
  },
});

export default styles;
