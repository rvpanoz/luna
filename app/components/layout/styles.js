import { drawerWidth } from 'styles/variables';
import { lighten } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  shiftContent: {
    paddingLeft: 225,
  },
  main: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingLeft: theme.spacing(8) + 1,
  },
  topBar: {
    width: '100%',
  },
  navigationBar: {
    width: '100%',
  },
  sidebar: {
    flex: 0,
  },
  content: {
    padding: theme.spacing(1),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
});

export default styles;
