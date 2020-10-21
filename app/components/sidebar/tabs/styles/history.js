import { defaultFont, grayColor } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => ({
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
  listItem: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1) + 4,
    margin: 0,
  },
});

export default styles;
