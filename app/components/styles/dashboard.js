const styles = theme => ({
  root: {
    padding: 0,
    margin: 0
  },
  flexContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexContainerItem: {
    fontWeight: 100
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
