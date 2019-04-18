import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { defaultFont, grayColor } from 'styles/variables';

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.spacing.unit
  },
  description: {
    height: 75,
    overflow: 'hidden'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    paddingTop: theme.spacing.unit
  },
  formItem: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: '#fff',
    backgroundColor: fade(theme.palette.common.black, 0.15),
    margin: `${theme.spacing.unit}px 0px ${theme.spacing.unit}px 0px`,
    width: '100%',
    border: '1px solid'
  },
  inputRoot: {
    ...defaultFont
  },
  inputInput: {
    display: 'inline-block',
    color: darken(grayColor, 0.5),
    padding: theme.spacing.unit
  }
});

export default styles;
