import { whiteColor } from 'styles/variables';

const style = theme => ({
  card: {
    border: 0,
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    borderRadius: theme.spacing.unit,
    background: whiteColor,
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    wordWrap: 'break-word',
    fontSize: 12
  },
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none'
  },
  cardProfile: {
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center'
  },
  cardChart: {
    '& p': {
      marginTop: 0,
      paddingTop: 0
    }
  }
});

export default style;
