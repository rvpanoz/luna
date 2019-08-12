import palette from '../palette';

export default {
  root: {
    padding: 10,
    color: palette.text.secondary,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)'
    }
  },
  sizeSmall: {
    marginLeft: 4,
    marginRight: 4,
    padding: 12
  }
};
