import { grayColor } from 'styles/variables';
import { lighten } from '@material-ui/core/styles/colorManipulator';

export default theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: 220,
    height: 115
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontSize: 16,
    color: theme.palette.text.secondary,
    fontWeight: 700
  },
  value: {
    color: lighten(grayColor, 0.1),
    marginTop: theme.spacing.unit
  },
  iconWrapper: {
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
    borderRadius: '50%',
    display: 'inline-flex',
    height: 64,
    justifyContent: 'center',
    marginLeft: 'auto',
    width: 64
  },
  icon: {
    color: theme.palette.common.white,
    fontSize: 16,
    height: 32,
    width: 32
  }
});
