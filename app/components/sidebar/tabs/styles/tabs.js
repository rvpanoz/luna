import { defaultFont } from 'styles/variables';

const styles = (theme) => ({
  root: {
    width: '100%',
    paddingTop: 5,
    maxWidth: 275,
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main,
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
