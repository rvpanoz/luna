import { defaultFont } from 'styles/variables';

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: theme.palette.secondary.light,
  },
  tabLabel: {
    ...defaultFont,
    fontSize: 16,
  },
  noMargin: {
    margin: 0,
  },
});

export default styles;
