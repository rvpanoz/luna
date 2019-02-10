/* eslint-disable */

import { defaultFont } from 'styles/variables';

const styles = theme => ({
  wrapper: { position: 'relative', width: '100%' },
  header: {
    position: 'relative',
    zIndex: 4,
    height: 60
  },
  main: {
    width: '100%'
  },
  container: {
    width: '100%',
    padding: theme.spacing.unit * 3
  },
  console: {
    ...defaultFont,
    fontWeight: '300',
    lineHeight: '1.5em',
    position: 'fixed',
    bottom: 10,
    right: '0',
    width: '75px',
    background: 'rgba(0,0,0,.3)',
    zIndex: '1099',
    borderRadius: '8px 0 0 8px',
    textAlign: 'center'
  }
});

export default styles;
