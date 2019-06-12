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
    fontSize: 18,
    color: darken(grayColor, 0.5)
  },
  secondaryText: {
    ...defaultFont,
    color: darken(grayColor, 0.2),
    fontSize: 12
  },
  listItem: {
    padding: theme.spacing.unit,
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
