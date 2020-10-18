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
    justifyContent: 'flex-end',
    '& > Button:nth-child(1)': {
      marginRight: theme.spacing(1),
    },
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
    backgroundColor: fade(theme.palette.common.white, 0.75),
    margin: '10px 0px 10px 0px',
    width: '100%',
    border: '1px solid #ccc',
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
    lineHeight: '1em',
  },
  inputInput: {
    ...defaultFont,
    padding: theme.spacing(1),
  },
  toolbar: {
    height: 10,
  },
});

export default styles;
