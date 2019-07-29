import { drawerWidth } from 'styles/variables';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(6),
    paddingTop: theme.spacing(1)
  },
  sidebar: {
    flex: 0,
  },
  content: {
    flex: 1,
    padding: theme.spacing(1),
    height: '100%',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  mainContent: {
    flex: 1,
    padding: theme.spacing(1)
  },
});

export default styles;
