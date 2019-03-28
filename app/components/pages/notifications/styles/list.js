import { defaultFont, flexContainer } from 'styles/variables';

const styles = theme => ({
  paper: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
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
  header: {
    flex: '0 0 auto',
    padding: theme.spacing.unit + 4
  },
  divider: {
    marginBottom: theme.spacing.unit
  },
  avatar: {
    backgroundColor: theme.palette.common.white
  },
  withPadding: {
    padding: theme.spacing.unit + 4
  }
});

export default styles;
