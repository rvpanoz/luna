import { flexContainer, defaultFont } from 'styles/variables';

const styles = (theme) => ({
  flexContainer: {
    ...flexContainer,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  paper: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: theme.spacing(1),
  },
  toolbar: {
    width: '100%',
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      maxHeight: 535,
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 700,
    },
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse',
  },
  hasFilterBlur: {
    filter: 'blur(15px)',
  },
  flex: {
    ...flexContainer,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  tableRow: {
    border: 'none',
    padding: theme.spacing(1),
    lineHeight: '1.1',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tableCell: {
    '& p': {
      overflowWrap: 'break-word',
    },
  },
  cellText: {
    ...defaultFont,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  requiredBy: {
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('md')]: {
      width: 200,
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
  },
  span: {
    color: '#fff',
  },
  popover: {
    pointerEvents: 'none',
  },
});

export default styles;
