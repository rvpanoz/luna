import { defaultFont } from 'styles/variables';

const styles = theme => ({
  root: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  indicator: {
    backgroundColor: theme.palette.secondary.light
  },
  tabLabel: {
    ...defaultFont,
    fontSize: 14,
    paddingBottom: theme.spacing.unit
  }
});

export default styles;
