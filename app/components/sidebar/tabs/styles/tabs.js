import { defaultFont } from 'styles/variables';

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 285,
    marginTop: theme.spacing(1) / 2,
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
