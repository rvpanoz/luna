import { darken } from '@material-ui/core/styles/colorManipulator';
import { grayColor } from 'styles/variables';

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.spacing.unit
  },
  caption: {
    color: darken(grayColor, 0.6),
    marginTop: theme.spacing.unit * 2
  },
  options: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 2,
    padding: theme.spacing.unit
  },
  formControl: {
    marginLeft: theme.spacing.unit
  },
  directory: {
    paddingTop: theme.spacing.unit
  }
});

export default styles;
