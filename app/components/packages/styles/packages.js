import { lighten } from '@material-ui/core/styles/colorManipulator';
import { flexContainer, defaultFont } from 'styles/variables';

const styles = (theme) => ({
  root: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 1024,
    },
  },
  typo: {
    ...defaultFont,
    fontSize: 16,
  },
  flexContainer: {
    ...flexContainer,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerHolder: {
    ...flexContainer,
    paddingTop: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
  },
  flexRow: {
    ...flexContainer,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flexItem: {
    marginRight: theme.spacing(1),
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
  table: {
    width: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse',
  },
  hasFilterBlur: {
    filter: 'blur(15px)',
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  outdated: {
    color: lighten(theme.palette.error.main, 0.1),
  },
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  noData: {
    ...defaultFont,
  },
  withPadding: {
    padding: theme.spacing(1) + 4,
  },
  smallIcon: {
    width: 15,
    height: 15,
    marginRight: theme.spacing(0.5),
  },
  nodata: {
    ...defaultFont,
  },
  icon: {
    width: '0.85em',
  },
  hidden: {
    display: 'none',
  },
  chip: {
    margin: theme.spacing(1),
  },
});

export default styles;
