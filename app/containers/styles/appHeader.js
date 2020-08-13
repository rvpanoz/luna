import { defaultFont, grayColor } from 'styles/variables';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  appBar: {
    zIndex: 0,
    padding: theme.spacing(2),
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white,
    '&:hover': {
      color: lighten(grayColor, 0.7),
      cursor: 'pointer',
    },
  },
  button: {
    borderColor: lightColor,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  dialogTitle: {
    padding: theme.spacing(2),
  },
  settings: {
    margin: theme.spacing(2),
  },
  tabLabel: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  workingDir: {
    color: theme.palette.common.white,
  },
  directory: {
    color: theme.palette.common.white,
  },
  marRight: {
    marginRight: theme.spacing(4),
  },
});

export default styles;
