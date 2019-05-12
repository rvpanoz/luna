import { grayColor, defaultFont } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  tab: {
    padding: theme.spacing.unit / 2,
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    padding: 0,
    margin: 0
  },
  secondaryText: {
    color: darken(grayColor, 0.2),
    paddingBottom: theme.spacing.unit,
    wordWrap: 'break-word',
    fontSize: 12
  },
  label: {
    ...defaultFont,
    fontSize: 18,
    paddingTop: theme.spacing.unit / 2,
    color: darken(grayColor, 0.5),
    lineHeight: '1.5em'
  }
});

export default styles;
