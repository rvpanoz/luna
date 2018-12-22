/* eslint-disable */

/*
 * Header styling
 */
import { lighten } from '@material-ui/core/styles/colorManipulator';

export default theme => ({
  menu_container: {
    position: 'absolute',
    top: 50,
    right: '0px',
    transform: 'translate(0, -100%)',
    width: 50,
    height: 50,
    cursor: 'pointer',
    '& $barActive': {
      '&:before': {
        top: 0,
        left: 0,
        transform: 'rotate(45deg)',
        backgroundColor: '#fff'
      },
      '&:after': {
        top: 0,
        left: 0,
        transform: 'rotate(-45deg)',
        backgroundColor: '#fff'
      }
    }
  },
  barActive: {
    backgroundColor: 'unset !important'
  },
  navBar: {
    alignItems: 'stretch',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  bar: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '2px',
    backgroundColor: '#fff',
    '&:before': {
      content: "''",
      position: 'absolute',
      top: '-5px',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'inherit',
      transition: 'all 300ms ease-in-out'
    },
    '&:after': {
      content: "''",
      position: 'absolute',
      top: '5px',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'inherit',
      transition: 'all 300ms ease-in-out'
    }
  },

  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '0',
    height: '100vh',
    backgroundColor: lighten('#333545', 0.99)
  },
  active: { width: '15%', transition: 'all 300ms ease-in-out' },
  inactive: { width: '0%', transition: 'all 300ms ease-in-out' },
  visible: {
    display: 'block !important',
    transition: 'all 300ms ease-in-out'
  },
  items: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    display: 'none',
    transition: 'all 300ms ease-in-out'
  }
});
