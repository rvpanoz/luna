import { grayColor } from 'styles/variables';

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
  }
});

export default styles;
