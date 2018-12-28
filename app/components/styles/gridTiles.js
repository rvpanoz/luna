const styles = theme => ({
  root: {
    // zIndex: 999,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 200,
    height: 250
  },
  img: {
    width: 100,
    height: 100
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
});

export default styles;
