import { fade } from '@material-ui/core/styles/colorManipulator';
import { defaultFont } from 'styles/variables';

const styles = (theme) => ({
  root: {
    minWidth: 400,
    padding: theme.spacing(1),
    '& > h2': {
      color: theme.palette.primary.dark,
      fontSize: 18,
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  flexContainer: { display: 'flex' },
  filterItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  bottomDivider: {
    margin: theme.spacing(1),
  },
  hidden: {
    display: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: '#fff',
    backgroundColor: fade(theme.palette.common.black, 0.15),
    margin: '10px 0px 10px 0px',
    width: '100%',
    border: '1px solid',
  },
  searchIcon: {
    width: theme.spacing(1) * 6,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: '1em',
  },
  inputInput: {
    color: '#001',
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1) * 5,
  },
  toolbar: {
    height: 10,
  },
});

export default styles;
