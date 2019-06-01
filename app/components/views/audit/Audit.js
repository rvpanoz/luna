import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import StatsCard from 'components/common/StatsCard';

import styles from './styles/audit';

const capitalize = text => {
  if (typeof text !== 'string') {
    return '';
  }

  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

const renderTotals = data => {
  // exclude vulnerabilities
  const totals = data.filter(
    dataItem =>
      dataItem.name !== 'vulnerabilities' &&
      dataItem.name !== 'totalDependencies'
  );

  // get total dependencies
  const totalDependencies = data
    ? data.filter(dataItem => dataItem.name === 'totalDependencies')[0].value
    : 0;

  return totals.map(dataItem => {
    const [title] = dataItem.name.split('Dependencies');

    return (
      <StatsCard
        title={title}
        key={dataItem.name}
        total={totalDependencies}
        count={dataItem.value}
      />
    );
  });
};

const renderVulnerabilites = (
  data,
  tableStyles,
  tableHead,
  vulnerabilityType,
  vulnerabilityValue
) => {
  const [vulnerabilities] = data.filter(
    dataItem => dataItem.name === 'vulnerabilities'
  );

  const { value } = vulnerabilities || [];

  return (
    <Table className={tableStyles}>
      <TableHead>
        <TableRow>
          <TableCell className={tableHead}>Type</TableCell>
          <TableCell className={tableHead} align="right">
            Total
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {value.map(dataItem => (
          <TableRow key={dataItem.name}>
            <TableCell>
              <span className={vulnerabilityType}>
                {capitalize(dataItem.name)}
              </span>
            </TableCell>
            <TableCell align="right">
              <span className={vulnerabilityValue}>{dataItem.value}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Audit = ({ classes, data }) => {
  if (!data || !data.length) {
    return (
      <Typography variant="subtitle1" className={classes.withPadding}>
        {' '}
        No audit data
      </Typography>
    );
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <div className={classes.flexContainer}>
          <div className={classes.header}>
            <Typography variant="h6" className={classes.title}>
              Audit report
            </Typography>
          </div>
          <Toolbar>
            <Button color="primary" variant="outlined">
              Fix
            </Button>
          </Toolbar>
        </div>
        <Divider className={classes.divider} light />
        <div className={classes.topSection}>{renderTotals(data)}</div>
        <div className={classes.bottomSection}>
          <div className={classes.bottomLeft}>
            {renderVulnerabilites(
              data,
              classes.table,
              classes.tableHead,
              classes.vulnerabilityType,
              classes.vulnerabilityValue
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
};

Audit.defaultProps = {
  data: []
};

Audit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(Audit);
