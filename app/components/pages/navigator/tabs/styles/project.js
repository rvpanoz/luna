import { grayColor } from 'styles/variables';

const styles = theme => ({
  tab: {
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    padding: 0,
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 2}px`
  },
  secondaryText: {
    color: grayColor
  }
});

export default styles;
