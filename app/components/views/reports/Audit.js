/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import StatsCard from 'components/common/StatsCard';

import styles from './styles/audit';

const renderTextButton = ({
  containerHolder,
  textHolder,
  buttonHolder,
  mode
}) => (
  <div className={containerHolder}>
    <div className={textHolder}>No audit data</div>
    <div className={buttonHolder}>
      <Tooltip
        title={
          mode === 'global'
            ? 'npm audit is not available in global mode'
            : 'run npm audit'
        }
      >
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={mode === 'global'}
          >
            Run npm audit
          </Button>
        </div>
      </Tooltip>
    </div>
  </div>
);

const renderAuditData = (data, totalDependencies) => {
  const vulnerabilities = data.filter(dataItem =>
    Array.isArray(dataItem.value)
  );
  const packagesTotals = data.filter(
    dataItem => !Array.isArray(dataItem.value)
  );

  return packagesTotals.map(data => {
    const [title] = data.name.split('Dependencies');

    return (
      <StatsCard
        title={title}
        key={data.name}
        totalDependencies={totalDependencies}
        countDependencies={data.value}
      />
    );
  });
};

const AuditReport = ({ classes, data, mode }) => {
  const { containerHolder, textHolder, buttonHolder } = classes;
  const totalDependencies = data.filter(
    dataItem => dataItem.name === 'totalDependencies'
  )[0].value;

  return !data
    ? renderTextButton({ containerHolder, textHolder, buttonHolder, mode })
    : renderAuditData(data, totalDependencies);
};

AuditReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(AuditReport);
