import { lighten } from '@material-ui/core';
import { drawerWidth } from 'styles/variables';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  spacer: {
    margin: theme.spacing(1, 0),
  },
  drawer: {
    width: drawerWidth,
    borderRight: 0,
  },
});

export default styles;
