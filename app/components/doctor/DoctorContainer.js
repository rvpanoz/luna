import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';
import Grid from '@material-ui/core/Grid';

import { AppLoader, HelperText } from 'components/common';
import { iMessage } from 'commons/utils';
import { runDoctor } from 'models/npm/actions';

import Doctor from './Doctor';
import styles from './styles/doctor';

const mapState = ({
  ui: {
    loaders: {
      doctorLoader: { loading, message },
    },
  },
  npm: {
    doctor: { result },
  },
}) => ({
  loading,
  message,
  result,
});

const DoctorContainer = ({ classes }) => {
  const { loading, message, result } = useMappedState(mapState);
  const [status, setStatus] = useState({
    type: result ? 'doctor' : 'init',
    options: null,
  });
  const { content, error } = result || {};
  const dispatch = useDispatch();

  const handleDoctor = () =>
    dispatch(
      runDoctor({
        ipcEvent: 'npm-doctor',
        cmd: ['doctor'],
      })
    );

  const initOptions = {
    text: iMessage('info', 'npmDoctorInfo'),
    actionText: iMessage('action', 'runDoctor'),
    actionHandler: handleDoctor,
    color: 'primary',
  };

  useEffect(() => {
    if (error) {
      const { message: errorMessage, code } = error || {};

      const errorOptions = {
        text: errorMessage,
        code,
      };

      setStatus((options) => ({
        ...options,
        type: 'error',
        options: errorOptions,
      }));

      return;
    }

    setStatus((options) => ({
      ...options,
      type: content ? 'doctor' : 'init',
    }));
  }, [content, error, loading]);

  const { type, options } = status;

  return (
    <AppLoader loading={loading} message={message}>
      <div className={classes.root}>
        {type === 'error' && <HelperText {...options} />}
        {type === 'init' && <HelperText {...initOptions} />}
        {type === 'doctor' && (
          <Grid className={classes.container} container>
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <div className={classes.wrapper}>
                <Doctor data={content} />
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    </AppLoader>
  );
};

DoctorContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(DoctorContainer);
