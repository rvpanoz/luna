import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'redux-react-hook';
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
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import FixIcon from '@material-ui/icons/Build';
import StatsCard from 'components/common/StatsCard';

import { runAudit } from 'models/npm/actions';

import FixOptions from './FixOptions';
import styles from './styles/audit';

const capitalize = text => {
  if (typeof text !== 'string') {
    return '';
  }

  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

const runAuditFix = () => {};

const renderTotals = data => {
  const totals = data.filter(
    dataItem =>
      dataItem.name !== 'vulnerabilities' &&
      dataItem.name !== 'totalDependencies'
  );

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
  const [fix, setFix] = useState(false);
  const [optionsOpen, toggleOptions] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!Array.isArray(data)) {
      return;
    }

    const [vulnerabilities] =
      data &&
      data.length &&
      data.filter(dataItem => dataItem.name === 'vulnerabilities');

    const { value } = vulnerabilities;

    const needFix =
      value &&
      value.reduce((total, dataItem) => {
        const { value } = dataItem;

        return total + value;
      }, 0);

    if (needFix) {
      setFix(true);
    }
  }, [data]);

  if (!data || !data.length) {
    return (
      <div className={classes.containerHolder}>
        <Typography
          variant="subtitle1"
          className={cn(classes.noData, classes.withPadding)}
        >
          No audit data
        </Typography>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <div className={classes.flexContainer}>
            <div className={classes.header}>
              <Typography variant="h6" className={classes.title}>
                Audit report
              </Typography>
            </div>
            <Toolbar>
              <Tooltip title="Fix vulnerabilities">
                <div>
                  <Button
                    aria-label="audit_fix"
                    disabled={!fix}
                    onClick={() => toggleOptions(!optionsOpen)}
                    color="primary"
                    variant="contained"
                  >
                    <FixIcon className={classes.icon} />
                    Fix all
                  </Button>
                </div>
              </Tooltip>
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
      <Dialog
        open={optionsOpen}
        fullWidth
        onClose={() => {}}
        aria-labelledby="fix-options"
      >
        <DialogContent>
          <FixOptions />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => {}} color="primary" autoFocus>
            Fix
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
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
