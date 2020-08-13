import { lighten } from '@material-ui/core/styles/colorManipulator';
import { defaultFont } from 'styles/variables';

const styles = (theme) => ({
  divider: {
    margin: theme.spacing(1),
  },
  header: {
    backgroundColor: lighten(theme.palette.secondary.light, 0.9),
    fontSize: 20,
    fontWeight: 400,
    padding: theme.spacing(1),
  },
  paper: {
    width: '100%',
  },
  listItem: {
    padding: theme.spacing(1),
    margin: 0,
  },
  wrapper: {
    width: '100%',
  },
  withPadding: {
    padding: theme.spacing(1),
  },
});

export default styles;
