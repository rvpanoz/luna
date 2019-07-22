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
    fontSize: 16,
    paddingBottom: theme.spacing(1)
  },
  noMargin: {
    margin: 0
  },
  appBar: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0.5)
  }
});

export default styles;
