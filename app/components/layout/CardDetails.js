/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, string, node, oneOf } from 'prop-types';
import cn from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import ProjectDetails from './RepositoryDetails';

import styles from './styles/cardDetails';

const AppCardDetails = props => {
  const { classes, title, subtext, text, color, link, icon } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <ProjectDetails title={title} />
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Typography component="p" className={classes.cardText}>
          {subtext}
        </Typography>
      </CardActions>
    </Card>
  );
};

AppCardDetails.defaultProps = {
  color: 'gray',
  icon: true
};

AppCardDetails.propTypes = {
  classes: objectOf(string).isRequired,
  color: oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  title: node,
  text: node,
  subtext: string,
  link: string
};

export default withStyles(styles)(AppCardDetails);
