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
} from 'styles/variables';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    top: -5,
    // backgroundColor: 'rgba(30, 53, 75, 0.925)',
    backgroundColor: lighten(theme.palette.secondary.light, 0.1),
    boxShadow: 'none',
    borderBottom: 0,
    marginBottom: 0,
    position: 'absolute',
    width: '100%',
    maxHeight: 75,
    zIndex: 999,
    color: '#fff',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    display: 'block'
  },
  container,
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    fontFamily: '"Regular", "Helvetica", sans-serif',
    fontSize: 26
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
  paper: {
    width: 450,
    height: 385,
    position: 'absolute',
    top: '15%',
    left: '35%'
  },
  menuButton: {
    top: -1,
    marginLeft: -12,
    marginRight: 20
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
  headerToolbar: {
    position: 'relative'
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
  },
  settingsMenu: {
    minWidth: 200,
    '& li': {
      fontSize: 14
    }
  }
});

export default styles;
