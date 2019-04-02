import { grayColor, defaultFont } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  tab: {
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    padding: 0,
    margin: 0
  },
  secondaryText: {
    color: grayColor,
    paddingBottom: theme.spacing.unit * 2,
    wordWrap: 'break-word'
  },
  label: {
    ...defaultFont,
    fontSize: 18,
    color: darken(grayColor, 0.2),
    lineHeight: '1.5em'
  }
});

export default styles;
