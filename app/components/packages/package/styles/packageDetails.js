import lighten from '@material-ui/core/colors';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: red[500]
  },
  chip: {
    color: '#fff',
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  devDependenciesChip: {
    backgroundColor: theme.palette.primary.light
  },
  dependenciesChip: {
    backgroundColor: theme.palette.secondary.light
  },
  optionalDependenciesChip: {
    backgroundColor: lighten(theme.palette.secondary.light, 0.75)
  },
  peerDependenciesChip: {
    backgroundColor: lighten(theme.palette.secondary.light, 0.6)
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
