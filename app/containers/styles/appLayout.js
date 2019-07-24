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
  paperDialog: {
    minHeight: 475
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  mainContent: {
    flex: 1,
    padding: theme.spacing(2),
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
    paddingTop: theme.spacing(2)
  }
});

export default styles;
