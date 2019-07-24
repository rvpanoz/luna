import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: '#fff',
    backgroundColor: fade(theme.palette.common.black, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    },
    border: '1px solid'
  },
  searchIcon: {
    width: theme.spacing(1) * 6,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(2),
    color: theme.palette.common.white
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: '1em'
  },
  inputInput: {
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: 145,
    '&:focus': {
      width: 275
    }
  }
});

export default styles;
