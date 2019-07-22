import { grayColor } from 'styles/variables';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  tab: {
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    padding: 0,
    margin: 0
  },
  secondaryText: {
    color: grayColor,
    paddingBottom: theme.spacing(2)
  }
});

export default styles;
