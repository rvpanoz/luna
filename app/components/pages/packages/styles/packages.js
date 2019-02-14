import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
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
  toolbar: {
    width: '100%'
  },
  cards: {
    paddingBottom: theme.spacing.unit * 4
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
      maxHeight: 365
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: '100vh'
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
    fontSize: 12,
    lineHeight: '1.1em',
    textAlign: 'center',
    '& span': {
      display: 'inline-block',
      overflowWrap: 'break-word'
    }
  },
  w300: {
    width: '65%'
  },
  color: green[600],
  '&$checked': {
    color: green[500]
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
  avatar: {
    width: 20,
    height: 20,
    margin: theme.spacing.unit / 4
  },
  dependenciesAvatar: {
    color: '#fff',
    backgroundColor: lighten(theme.palette.primary.dark, 0.2)
  },
  optionalDependenciesAvatar: {
    color: '#fff',
    backgroundColor: lighten(theme.palette.secondary.dark, 0.2)
  },
  devDependenciesAvatar: {
    color: '#fff',
    backgroundColor: pink[500]
  },
  peerDependenciesAvatar: {
    color: '#fff',
    backgroundColor: pink[500]
  },
  chip: {
    margin: theme.spacing.unit
  }
});

export default styles;
