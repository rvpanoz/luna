/* eslint-disable */

/**
 * Package details
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useMappedState } from 'redux-react-hook';
import { objectOf, string } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import AppLoader from '../layout/AppLoader';

// TODO: move on separate file
const styles = theme => ({
  wrapper: {
    marginLeft: 10
  },
  card: {
    width: '100%'
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const mapState = state => ({
  active: state.packages.active,
  loader: state.common.packageLoader
});

const PackageDetails = props => {
  const { classes } = props;
  const { active, loader: loading, loader: message } = useMappedState(mapState);

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
