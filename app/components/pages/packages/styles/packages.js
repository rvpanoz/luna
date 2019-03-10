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
  color: green[600],
  '&$checked': {
    color: green[500]
  },
  outdated: {
    color: theme.palette.secondary.dark
  },
  name: {
    display: 'inline-block',
    position: 'relative',
    minWidth: '90%',
    textAlign: 'start'
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
    width: 15,
    height: 15,
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
