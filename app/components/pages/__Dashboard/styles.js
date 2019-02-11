import { flexContainer, flexItem } from 'styles/variables';

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    flexDirection: 'row'
  },
  flexItem,
  root: {
    padding: 0,
    margin: 0
  },
  textRight: {
    textAlign: 'right'
  },
  textLeft: {
    textAlign: 'left'
  },
  textCenter: {
    textAlign: 'center'
  },
  cardInfo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  actionButton: {
    width: 100,
    height: 15,
    textTransform: 'capitalize'
  }
});

export default styles;
