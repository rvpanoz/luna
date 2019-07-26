import { flexContainer } from 'styles/variables';

const styles = theme => ({
  wrapper: {
    whiteSpace: 'nowrap',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      maxHeight: 500,
      overflowY: 'scroll'
    },
    [theme.breakpoints.up('lg')]: {
      overflowY: 'scroll',
      maxHeight: 650
    }
  },
  flexContainer: {
    ...flexContainer,
  },
});

export default styles;
