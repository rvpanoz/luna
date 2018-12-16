/* eslint-disable */

/*
 * Header styling
 */

export default theme => ({
  menu_container: {
    position: 'absolute',
    top: 50,
    right: '0px',
    transform: 'translate(0, -100%)',
    width: 50,
    height: 50,
    cursor: 'pointer'
  },
  barActive: {
    display: 'inherit'
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
      transition: 'all 300ms ease-in-out',
      '&$close': {
        '&:before': {
          top: 0,
          left: 0,
          transform: 'rotate(45deg)'
        },
        '&:after': {
          top: 0,
          left: 0,
          transform: 'rotate(45deg)',
          backgroundColor: '#fff'
        }
      }
    }
  },
  close: {},
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '0',
    height: '100vh',
    backgroundColor: 'rgba(34, 34, 34, 0.05)'
  },
  active: { width: '25%', transition: 'all 300ms ease-in-out' },
  non_active: { width: '0', transition: 'all 300ms ease-in-out' },
  nav: {
    position: 'absolute',
    top: '10%',
    left: '25%',
    transform: 'translate(-50%, -50%)'
  },
  nav: {
    '& ul': { margin: '0', padding: '0', listStyle: 'none' },
    '& li': { textAlign: 'center' },
    '& a': {
      color: '#fff',
      fontSize: '14px',
      textDecoration: 'none',
      lineHeight: '100px',
      cursor: 'pointer',
      position: 'relative',
      '&:before': {
        content: "''",
        position: 'absolute',
        bottom: '-5px',
        left: '0',
        width: '100%',
        height: '1px',
        backgroundColor: '#222',
        transition: 'all 300ms ease-in-out',
        transform: 'scaleX(0)'
      },
      '&:hover': {
        '&:before': {
          transform: 'scaleX(1)'
        }
      }
    }
  }
});
