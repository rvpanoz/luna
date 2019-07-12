import { defaultFont } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%'
  },
  container: {
    width: '100%',
    padding: theme.spacing.unit * 4
  },
  types: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    [theme.breakpoints.only('xs')]: {
      flexWrap: 'wrap'
    }
  },
  typeItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing.unit * 3
  },
  typeItemText: {
    ...defaultFont,
    fontSize: '18px !important',
    marginLeft: theme.spacing.unit
  },
  chart: {}
});

export default styles;
