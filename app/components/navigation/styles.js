import { flexContainer } from 'styles/variables';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1) / 1.5,
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
  },
  flex: {
    ...flexContainer,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexGrow: {
    flexGrow: 1,
  },
});

export default styles;
