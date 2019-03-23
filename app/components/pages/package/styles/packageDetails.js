import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import { defaultFont } from 'styles/variables';

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  paper: {},
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: red[500]
  },
  header: {
    ...defaultFont,
    fontSize: 20,
    fontWeight: 400,
    padding: theme.spacing.unit
  },
  chip: {
    color: theme.palette.secondary.main,
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  devDependenciesChip: {
    backgroundColor: theme.palette.primary.light
  },
  dependenciesChip: {
    backgroundColor: theme.palette.secondary.light
  },
  optionalDependenciesChip: {
    backgroundColor: lighten(theme.palette.primary.light, 0.75)
  },
  peerDependenciesChip: {
    backgroundColor: darken(theme.palette.error.light, 0.6)
  },
  globalChip: {
    backgroundColor: theme.palette.secondary.main
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
  wrapper: {}
});

export default styles;
