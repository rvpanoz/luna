import { fade } from '@material-ui/core/styles/colorManipulator';
import { defaultFont } from 'styles/variables';

const styles = theme => ({
  root: {
    minWidth: 400,
    padding: theme.spacing.unit,
    '& > h2': {
      color: theme.palette.primary.dark,
      fontSize: 18
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  flexContainer: { display: 'flex' },
  filterItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing.unit
  },
  bottomDivider: {
    margin: theme.spacing.unit
  },
  hidden: {
    display: 'none'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: '#fff',
    backgroundColor: fade(theme.palette.common.black, 0.15),
    margin: '10px 0px 10px 0px',
    width: '100%',
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
    ...defaultFont,
    color: '#001',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5
  },
  toolbar: {
    height: 10
  }
});

export default styles;
