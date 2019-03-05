import { lighten } from '@material-ui/core/styles/colorManipulator';
import { drawerWidth } from 'styles/variables';

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
  }
});

export default styles;
