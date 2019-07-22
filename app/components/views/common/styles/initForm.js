import { darken } from '@material-ui/core/styles/colorManipulator';
import { grayColor } from 'styles/variables';

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.spacing(1)
  },
  caption: {
    color: darken(grayColor, 0.6),
    marginTop: theme.spacing(2)
  },
  options: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(1)
  },
  formControl: {
    marginLeft: theme.spacing(1)
  },
  directory: {
    paddingTop: theme.spacing(1)
  }
});

export default styles;
