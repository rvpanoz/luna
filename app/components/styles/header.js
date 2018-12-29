/* eslint-disable */

/*
 * Header styling
 */
import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from './general';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    top: '-10px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '10px',
    zIndex: '1029',
    color: '#555555',
    border: '0',
    borderRadius: '3px',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '70px',
    display: 'block'
  },
  container,
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    fontSize: '18px',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    top: '10px',
    '&:hover,&:focus': {
      background: 'transparent'
    }
  },
  primary: {
    backgroundColor: primaryColor,
    color: '#FFFFFF',
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor,
    color: '#FFFFFF',
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor,
    color: '#FFFFFF',
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor,
    color: '#FFFFFF',
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor,
    color: '#FFFFFF',
    ...defaultBoxShadow
  },
  settings: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 0
  },
  modal: {
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: 320
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -240
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  list: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  listItem: {
    marginLeft: 50
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.light,
      textDecoration: 'none'
    }
  },
  iconHover: {
    '&:hover': {
      fill: 'rgb(225, 0, 80)'
    }
  }
});

export default styles;
