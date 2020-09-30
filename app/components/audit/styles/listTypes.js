import { flexContainer } from 'styles/variables';

const styles = (theme) => ({
  container: {
    ...flexContainer,
    alignItems: 'center',
  },
  list: {
    padding: theme.spacing(1),
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 375,
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: 400,
    },
  },
  dot: {
    marginLeft: theme.spacing(1),
  },
  chip: {
    fontSize: 20,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.neutral,
  },
});

export default styles;
