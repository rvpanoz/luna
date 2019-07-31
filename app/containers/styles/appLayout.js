import { drawerWidth } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  shiftContent: {
    paddingLeft: 225
  },
  main: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingLeft: theme.spacing(6),
    paddingTop: theme.spacing(1)
  },
  topBar: {
    width: '100%'
  },
  navigationBar: {
    width: '100%'
  },
  sidebar: {
    flex: 0
  },
  content: {
    padding: theme.spacing(1)
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  }
});

export default styles;
