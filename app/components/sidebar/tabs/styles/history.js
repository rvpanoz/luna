import { defaultFont, grayColor } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  tab: {
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    ...defaultFont,
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
  directory: {
    ...defaultFont,
    display: 'inline-block',
    color: darken(grayColor, 0.2),
    fontSize: 14,
    wordWrap: 'break-word',
    maxWidth: 190,
  },
  listItem: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1) + 4,
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
