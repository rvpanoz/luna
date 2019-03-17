import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: '#fff',
    backgroundColor: fade(theme.palette.common.black, 0.15),
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    },
    border: '1px solid'
  },
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#fff',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: 145,
    '&:focus': {
      width: 275
    }
  }
});

export default styles;
