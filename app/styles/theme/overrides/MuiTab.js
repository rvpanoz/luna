export default {
  root: {
    textTransform: 'initial',
    margin: 0,
    minWidth: 0,
    height: 50,
    fontWeight: 400,
    fontSize: 14,
    '@media (min-width: 960px)': {
      minWidth: 90,
    },
    '&$selected': {
      fontWeight: 500,
    },
  },
};
