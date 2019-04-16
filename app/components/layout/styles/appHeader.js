import { defaultFont, grayColor } from 'styles/variables';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  root: {
    width: '100%'
  },
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing.unit
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white,
    '&:hover': {
      color: lighten(grayColor, 0.7)
    }
  },
  button: {
    borderColor: lightColor
  },
  dialogTitle: {
    padding: theme.spacing.unit * 2
  },
  settings: {
    margin: theme.spacing.unit * 2
  },
  tabLabel: {
    ...defaultFont,
    fontSize: 16,
    paddingBottom: theme.spacing.unit
  }
});

export default styles;
