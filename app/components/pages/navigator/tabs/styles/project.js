import { grayColor } from 'styles/variables';

const styles = theme => ({
  tab: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  listItem: {
    padding: 0,
    margin: 0
  },
  secondaryText: {
    color: grayColor
  }
});

export default styles;
