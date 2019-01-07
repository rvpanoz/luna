/**
 * Package details
 */

import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, string } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { INFO_MESSAGES } from 'constants/AppConstants';
import { doSetSnackbar } from 'models/ui/selectors';
import { doSetActive } from 'models/packages/selectors';

import styles from '../styles/packageDetails';

const mapState = ({ common: { loader }, packages: { active } }) => ({
  active,
  loader
});

const PackageDetails = props => {
  const { classes } = props;
  const { active } = useMappedState(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(['view-close'], (event, status, error, data) => {
      try {
        const newActive = data && JSON.parse(data);

        doSetActive(dispatch, { active: newActive });

        // TODO: fix it
        doSetSnackbar(dispatch, {
          open: true,
          type: error ? 'danger' : 'info',
          message: error || INFO_MESSAGES.packageLoaded
        });
      } catch (err) {
        throw new Error(err);
      }
    });

    return () => ipcRenderer.removeAllListeners(['view-package-close']);
  }, []);

  return (
    <div className={classes.wrapper}>
      {active ? (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {active.license}
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={active.name}
            subheader={active.version}
          />
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {active.description}
            </Typography>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

PackageDetails.propTypes = {
  classes: objectOf(string).isRequired
};

export default withStyles(styles)(PackageDetails);
