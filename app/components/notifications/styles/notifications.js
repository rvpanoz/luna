import { flexContainer } from 'styles/variables';

const styles = (theme) => ({
  flexContainer: {
    ...flexContainer,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  paper: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  toolbar: {
    width: '100%',
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      maxHeight: 535,
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 700,
    },
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse',
  },
  hasFilterBlur: {
    filter: 'blur(15px)',
  },
});

export default styles;
