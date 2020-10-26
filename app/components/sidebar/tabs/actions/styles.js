import { defaultFont, grayColor, flexContainer } from 'styles/variables';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => ({
  flexWrapper: {
    ...flexContainer,
  },
  content: {
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    ...defaultFont,
    color: lighten(grayColor, 0.01),
    marginLeft: theme.spacing(1),
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
  secondaryText: {
    fontSize: 12,
    color: darken(grayColor, 0.1),
  },
  listItem: {
    margin: 0,
  },
  secondaryColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light,
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
