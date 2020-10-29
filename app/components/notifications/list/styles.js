import { flexContainer, defaultFont } from 'styles/variables';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => ({
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  toolbar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  listWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    padding: theme.spacing(1),
    height: window.innerHeight - 200,
  },
  listItem: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: lighten(theme.palette.common.gray, 0.1),
    },
  },
});

export default styles;
