/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import { parseNpmDoctor } from 'commons/utils';

import styles from './styles/doctor';

const renderTextButton = ({
  containerHolder,
  textHolder,
  buttonHolder,
  mode
}) => (
  <div className={containerHolder}>
    <div className={textHolder}>No doctor data</div>
    <div className={buttonHolder}>
      <Tooltip
        title={
          mode === 'global'
            ? 'npm doctor is not available in global mode'
            : 'run npm doctor'
        }
      >
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={mode === 'global'}
          >
            Run npm doctor
          </Button>
        </div>
      </Tooltip>
    </div>
  </div>
);

const renderDoctorData = data => parseNpmDoctor(data);

const DoctorReport = ({ classes, data, mode }) => {
  const { containerHolder, textHolder, buttonHolder } = classes;

  return !data
    ? renderTextButton({ containerHolder, textHolder, buttonHolder, mode })
    : renderDoctorData(data);
};

DoctorReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string.isRequired,
  data: PropTypes.string
};

export default withStyles(styles)(DoctorReport);
