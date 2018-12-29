/* eslint-disable */

const styles = theme => ({
  wrapper: { position: 'relative', width: '100%' },
  header: {
    position: 'relative',
    zIndex: '4',
    height: '70px',
    // backgroundColor: '#333545',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTransition: '-webkit-transform 0.3s',
    MozTransition: '-moz-transform 0.3s',
    transition: 'transform 0.3s'
  },
  main: {
    display: 'flex',
    width: '100%',
    height: 'calc(100vh - 50px)',
    position: 'relative',
    zIndex: '2',
    backgroundColor: 'transparent',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTransition: '-webkit-transform 0.3s',
    MozTransition: '-moz-transform 0.3s',
    transition: 'transform 0.3s'
  },
  container: {
    width: '100%',
    padding: 20
  }
});

export default styles;
