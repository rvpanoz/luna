import { flexContainer } from 'styles/variables';

const styles = theme => ({
  list: {
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
      maxHeight: 400
    }
  }
});

export default styles;
