import { defaultFont } from 'styles/variables';

const styles = () => ({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-around',
    left: '50%',
    top: '50%',
    padding: 0,
    margin: 0,
  },
  relative: {
    left: '0%',
    position: 'relative',
  },
  progress: {
    padding: 0,
    margin: 0,
  },
  message: {
    fontSize: 14,
    padding: 0,
    margin: 0,
  },
});

export default styles;
