import {
  defaultFont,
  primaryBoxShadow,
  // primaryColor,
  dangerColor
} from './general';

const styles = theme => ({
  notifications: {
    zIndex: '4',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '5px',
      border: '1px solid #FFF',
      right: '10px',
      fontSize: '9px',
      background: dangerColor,
      color: '#FFFFFF',
      minWidth: '16px',
      height: '16px',
      borderRadius: '10px',
      textAlign: 'center',
      lineHeight: '16px',
      verticalAlign: 'middle',
      display: 'block'
    },
    [theme.breakpoints.down('sm')]: {
      ...defaultFont,
      fontSize: '14px',
      marginRight: '8px'
    }
  },
  dropdown: {
    borderRadius: '3px',
    border: '0',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
    top: '100%',
    zIndex: '1000',
    minWidth: '160px',
    padding: '5px 0',
    margin: '2px 0 0',
    fontSize: '14px',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box'
  },
  dropdownItem: {
    ...defaultFont,
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '2px',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: '400',
    lineHeight: '1.42857143',
    color: '#333',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: '#FFFFFF',
      ...primaryBoxShadow
    }
  }
});

export default styles;
