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
