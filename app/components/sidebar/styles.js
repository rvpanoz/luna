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
});

export default styles;
