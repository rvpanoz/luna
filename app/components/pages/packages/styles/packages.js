import { darken } from '@material-ui/core/styles/colorManipulator';
import { flexContainer, defaultFont } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  flexContainer: {
    ...flexContainer,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flexContainerCell: {
    ...flexContainer,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  flexRow: {
    ...flexContainer,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flexItem: {
    padding: theme.spacing.unit
  },
  toolbar: {
    width: '100%'
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
      maxHeight: 500
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 650
    }
  },
  tableRow: {
    border: 'none',
    padding: 10,
    lineHeight: '1.1',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer'
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
  tableCell: {
    ...defaultFont,
    textAlign: 'center',
    '& p': {
      overflowWrap: 'break-word'
    }
  },
  outdated: {
    color: theme.palette.secondary.dark
  },
  updated: {
    color: darken('#00b300', 0.1)
  },
  nodata: {
    padding: theme.spacing.unit * 2.5
  },
  icon: {
    width: '0.85em'
  },
  hidden: {
    display: 'none'
  },
  extraneous: {
    color: darken(theme.palette.secondary.light, 0.1)
  },
  chip: {
    margin: theme.spacing.unit
  },
  group: {
    color: darken(theme.palette.secondary.light, 0.2)
  }
});

export default styles;
