import { defaultFont } from 'styles/variables';

const styles = () => ({
  tableHeadCell: {
    ...defaultFont,
    fontSize: 16,
    textAlign: 'center'
  },
  tableCell: {
    fontSize: 14,
    lineHeight: '1.4em',
    padding: '0px 12px',
    verticalAlign: 'middle',
    maxWidth: 100,
    textAlign: 'center'
  }
});

export default styles;
