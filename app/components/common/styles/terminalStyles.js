import { defaultFont } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%'
  },
  top: {
    ...defaultFont,
    height: '22px',
    background: 'linear-gradient(0deg, #d8d8d8, #ececec)',
    borderTop: '1px solid white',
    borderBottom: '1px solid #b3b3b3',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: '13px',
    lineHeight: '22px',
    textAlign: 'center'
  },
  buttons: {
    position: 'absolute',
    float: 'left',
    margin: '0 8px'
  },
  button: {
    padding: 0,
    margin: 0,
    marginRight: 4,
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  close: {
    backgroundColor: '#ff6159'
  },
  maximize: {
    backgroundColor: '#25cc3e'
  },
  minimize: {
    backgroundColor: '#ffbf2f'
  },
  terminal: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit / 2,
    backgroundColor: 'black',
    opacity: '0.7',
    minHeight: 150,
    overflowY: 'scroll',
    color: 'white',
    fontFamily: "'Source Code Pro', monospace",
    fontWeight: '200',
    fontSize: '14px',
    whiteSpace: '-o-pre-wrap',
    wordWrap: 'break-word',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflowY: 'auto',
    '& > span': {
      width: '100%',
      padding: theme.spacing.unit
    }
  }
});

export default styles;
