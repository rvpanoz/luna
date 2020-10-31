import { lighten } from '@material-ui/core';
import { drawerWidth, grayColor } from 'styles/variables';

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    borderRight: 0,
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
    },
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  tabs: {
    flexGrow: 2,
  },
  log: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  command: {
    fontSize: 12,
    color: lighten(grayColor, 0.1),
    wordWrap: 'break-word',
  },
});

export default styles;
