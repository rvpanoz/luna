import { defaultFont, flexContainer } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit
  },
  container: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      maxHeight: 500
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 775
    }
  },
  divider: {
    marginBottom: theme.spacing.unit
  },
  avatar: {
    backgroundColor: theme.palette.common.white
  }
});

export default styles;
