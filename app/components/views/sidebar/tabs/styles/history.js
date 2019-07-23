import { defaultFont, grayColor } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  tab: {
    backgroundColor: theme.palette.background.paper
  },
  label: {
    ...defaultFont,
    width: '100%',
    fontSize: 16,
    color: darken(grayColor, 0.5)
  },
  directory: {
    ...defaultFont,
    color: darken(grayColor, 0.2),
    fontSize: 14,
    wordWrap: 'break-word',
    maxWidth: 150
  },
  listItem: {
    padding: theme.spacing(1),
    margin: 0
  },
  secondaryColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light
  },
  warningColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.warning.light
  },
  errorColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.light
  }
});

export default styles;
