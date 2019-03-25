import red from '@material-ui/core/colors/red';
import { defaultFont } from 'styles/variables';

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: red[500]
  },
  divider: {
    padding: theme.spacing.unit
  },
  group: {
    padding: 0,
    margin: 0
  },
  header: {
    ...defaultFont,
    backgroundColor: theme.palette.secondary.light,
    fontSize: 20,
    fontWeight: 400,
    padding: theme.spacing.unit
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    width: '100%'
  },
  wrapper: {
    width: '100%'
  }
});

export default styles;
