import { fade } from '@material-ui/core/styles/colorManipulator';
import { defaultFont } from 'styles/variables';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > Button:nth-child(1)': {
      marginRight: theme.spacing(1),
    },
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
  controlLabel: {
    fontSize: 12,
  },
});

export default styles;
