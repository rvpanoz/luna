import { defaultFont, grayColor } from 'styles/variables';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => ({
  content: {
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    ...defaultFont,
    color: lighten(grayColor, 0.1),
  },
  header: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  title: {
    ...defaultFont,
    fontSize: 20,
    paddingBottom: theme.spacing(1),
  },
  listItem: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1) + 4,
    margin: 0,
  },
  primaryColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
  secondaryColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
  },
  warningColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.light,
  },
  errorColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.light,
  },
});

export default styles;
