import { grayColor } from 'styles/variables';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: 0,
  },
  listItem: {
    padding: 0,
    margin: 0,
  },
  secondaryText: {
    color: grayColor,
    paddingBottom: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
});

export default styles;
