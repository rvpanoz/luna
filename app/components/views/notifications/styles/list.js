import { defaultFont } from 'styles/variables';

const styles = theme => ({
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest
    })
  },
  paper: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 1024
    }
  },
  toolbar: {
    width: '100%'
  },
  tableCell: {
    '& p': {
      overflowWrap: 'break-word'
    }
  },
  cellText: {
    ...defaultFont,
    fontSize: 16,
    [theme.breakpoints.up('lg')]: {
      width: 'auto'
    },
    [theme.breakpoints.down('md')]: {
      width: 200
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      maxHeight: 450
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 650
    }
  },
  table: {
    width: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  hasFilterBlur: {
    filter: 'blur(15px)'
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  }
});

export default styles;
