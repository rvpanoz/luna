/* eslint-disable */

const styles = theme => ({
  wrapper: { position: 'relative', width: '100%' },
  header: {
    position: 'relative',
    zIndex: '4',
    height: '50px',
    backgroundColor: '#333545',
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
    backgroundColor: '#40508e',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTransition: '-webkit-transform 0.3s',
    MozTransition: '-moz-transform 0.3s',
    transition: 'transform 0.3s'
  }
});

export default styles;
