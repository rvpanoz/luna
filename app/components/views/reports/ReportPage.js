import React from 'react';
import PropTypes from 'prop-types';
import { useMappedState } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import Audit from './Audit';
import Doctor from './Doctor';

import styles from './styles/reportPage';

const mapState = ({ npm: { auditData, doctorData } }) => ({
  auditData,
  doctorData
});

const ReportPage = ({ classes }) => {
  const { auditData, doctorData } = useMappedState(mapState);

  return (
    <section className={classes.root}>
      <div className={classes.topSection}>
        <Audit data={auditData} />
      </div>
      <div className={classes.bottomSection}>
        <Doctor data={doctorData} />
      </div>
    </section>
  );
};

ReportPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(ReportPage);
