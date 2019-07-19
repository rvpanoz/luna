import { lighten } from '@material-ui/core/styles/colorManipulator';
import { flexContainer, defaultFont } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 1024
    }
  },
  typo: {
    ...defaultFont,
    fontSize: 16
  },
  flexContainer: {
    ...flexContainer,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerHolder: {
    ...flexContainer,
    paddingTop: theme.spacing.unit * 2,
    flexDirection: 'column',
    alignItems: 'center'
  },
  flexRow: {
    ...flexContainer,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flexItem: {
    marginRight: theme.spacing.unit
  },
  toolbar: {
    width: '100%'
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      maxHeight: 450
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 650
    }
  },
  table: {
    width: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  hasFilterBlur: {
    filter: 'blur(15px)'
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  outdated: {
    color: lighten(theme.palette.error.main, 0.1)
  },
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest
    })
  },
  noData: {
    ...defaultFont
  },
  withPadding: {
    padding: theme.spacing.unit + 4
  },
  smallIcon: {
    width: 15,
    height: 15,
    marginRight: theme.spacing.unit / 2
  },
  nodata: {
    ...defaultFont
  },
  icon: {
    width: '0.85em'
  },
  hidden: {
    display: 'none'
  },
  chip: {
    margin: theme.spacing.unit
  }
});

export default styles;
