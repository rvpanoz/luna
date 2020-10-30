import { lighten } from '@material-ui/core';
import { drawerWidth } from 'styles/variables';

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
  },
  log: {
    overflowY: 'scroll',
    height: 600,
  },
  command: {
    fontSize: 12,
    wordWrap: 'break-word',
  },
});

export default styles;
