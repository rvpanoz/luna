import palette from './palette';
import {darken} from 'material-ui/styles/colorManipulator';

export default shade => ({
  '@global': {
    'body *, html *': {
      boxSizing: 'border-box',
    },
    'html, body': {
      backgroundColor: palette.shades[shade].background.default,
      fontSize: '18px',
      margin: 0,
      padding: 0,
      fontFamily: '"Helvetica", "Arial", sans-serif',
    },
    a: {
      color: palette.common.teal['500'],
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    '.page-content': {
      paddingTop: '65px',
      flex: '1 1 100%',
      margin: '0 auto',
      '@media (min-width: 948px)': {
        maxWidth: '900px',
      },
      '@media (min-width: 600px)': {
        paddingLeft: '24px',
        paddingRight: '24px',
      },
    },
  },
});
