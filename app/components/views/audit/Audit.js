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

import { setSnackbar } from 'models/ui/actions'
import { runAudit } from 'models/npm/actions';

import FixOptions from './FixOptions';
import styles from './styles/audit';

const capitalize = text => {
  if (typeof text !== 'string') {
    return '';
  }

  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

// TODO: fix
const runAuditFix = () => { };

const renderTotals = content => {

  const { totalDependencies } = content || {}

  // get total values (exclude vulnerabiltities)
  const values = Object.keys(content).filter(key => key !== 'totalDependencies' && key !== 'vulnerabilities')

  return values.map(keyValue => {
    const title = keyValue.split('Dependencies');

    return (
      <StatsCard
        title={title}
        key={keyValue}
        total={totalDependencies}
        count={content[keyValue]}
      />
    );
  });
};

const renderVulnerabilites = (
  classes,
  content
) => {
  const { vulnerabilities } = content || {}

  return (
    <Table className={classes.tableStyles}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHead}>Type</TableCell>
          <TableCell className={classes.tableHead} align="right">
            Total
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(vulnerabilities).map(key => (
          <TableRow key={key}>
            <TableCell>
              <span className={classes.vulnerabilityType}>
                {capitalize(key)}
              </span>
            </TableCell>
            <TableCell align="right">
              <span className={classes.vulnerabilityValue}>{vulnerabilities[key]}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const renderError = (classes, code, summary) => <div className={classes.container}>
  <div className={classes.flexContainer}>
    <div className={classes.header}>
      <Typography className={classes.title}>
        {code}
      </Typography>
      <Divider className={classes.divider} light />
      <Typography variant="subtitle1">
        {summary}
      </Typography>
    </div>
  </div>
</div>

const Audit = ({ classes, data }) => {
  const [fix, setFix] = useState(false);
  const [optionsOpen, toggleOptions] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      return;
    }

    const { error, summary } = data || {};

    if (error) {
      dispatch(setSnackbar({
        open: true,
        type: 'error',
        message: summary
      }))

      return;
    }

    const { content } = data || {};
    const { vulnerabilities } = content || {}
    const { value } = vulnerabilities || {};

    const needFix =
      value &&
      value.reduce((total, dataItem) => {
        const { value } = dataItem;

        return total + value;
      }, 0);

    if (needFix) {
      setFix(true);
    }
  }, [data, dispatch]);

  if (!data) {
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

  const { error } = data;

  if (error) {
    const { code, summary, detail } = data;

    return renderError(classes, code, summary, detail)
  }

  const { content } = data || {};

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
          <div className={classes.topSection}>{renderTotals(content)}</div>
          <div className={classes.bottomSection}>
            <div className={classes.bottomLeft}>
              {renderVulnerabilites(
                classes,
                content
              )}
            </div>
          </div>
        </div>
      </Paper>
      <Dialog
        open={optionsOpen}
        fullWidth
        onClose={() => { }}
        aria-labelledby="fix-options"
      >
        <DialogContent>
          <FixOptions />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { }} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => { }} color="primary" autoFocus>
            Fix
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

Audit.defaultProps = {
  data: null
};

Audit.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.bool, PropTypes.string]))
};

export default withStyles(styles)(Audit);
