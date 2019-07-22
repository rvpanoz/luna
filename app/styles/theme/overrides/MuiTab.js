import palette from '../palette';

export default {
  root: {
    '&$selected': {
      fontWeight: 500
    },
    textTransform: 'initial',
    minWidth: 0,
    height: '50px',
    fontWeight: 400,
    textTransform: 'none',
    fontSize: '14px',
    '@media (min-width: 960px)': {
      minWidth: '90px'
    },
    '&$selected': {
      fontWeight: 500
    }
  }
};
