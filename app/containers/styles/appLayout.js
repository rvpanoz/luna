import { lighten } from '@material-ui/core/styles/colorManipulator';
import { defaultFont, drawerWidth } from 'styles/variables';

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  },
  mainContent: {
    flex: 1,
    padding: theme.spacing.unit * 2,
    background: lighten('#fff', 0.1),
    overflow: 'hidden'
  },
  label: {
    ...defaultFont,
    fontSize: 20
  },
  subheader: {
    ...defaultFont,
    fontSize: 16
  },
  value: {
    ...defaultFont,
    fontSize: 22,
    color: theme.palette.secondary.light
  },
  list: {
    paddingTop: theme.spacing.unit * 2
  }
});

export default styles;
