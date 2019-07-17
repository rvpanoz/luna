const styles = theme => ({
  body: {
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
      maxHeight: 450
    }
  }
});

export default styles;
