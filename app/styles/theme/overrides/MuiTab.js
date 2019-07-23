export default {
  root: {
    textTransform: 'initial',
    minWidth: 0,
    height: '50px',
    fontWeight: 400,
    fontSize: '14px',
    '@media (min-width: 960px)': {
      minWidth: '90px'
    },
    '&$selected': {
      fontWeight: 500
    }
  }
};
