/* eslint-disable */

/**
 * Card info component
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, object, oneOf, string, node } from 'prop-types';
import cn from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import styles from '../styles/cardRegular';

const AppCardRegular = props => {
  const {
    classes,
    headerColor,
    plainCard,
    cardTitle,
    cardSubtitle,
    content,
    footer
  } = props;

  const plainCardClasses = cn({
    [' ' + classes.cardPlain]: plainCard
  });
  const cardPlainHeaderClasses = cn({
    [' ' + classes.cardPlainHeader]: plainCard
  });

  return (
    <Card className={classes.card + plainCardClasses}>
      <CardHeader
        classes={{
          root:
            classes.cardHeader +
            ' ' +
            classes[headerColor + 'CardHeader'] +
            cardPlainHeaderClasses,
          title: classes.cardTitle,
          subheader: classes.cardSubtitle
        }}
        title={cardTitle}
        subheader={cardSubtitle}
      />
      <CardContent>{content}</CardContent>
      {footer !== undefined ? (
        <CardActions className={classes.cardActions}>{footer}</CardActions>
      ) : null}
    </Card>
  );
};

AppCardRegular.defaultProps = {
  color: 'primary'
};

AppCardRegular.propTypes = {
  classes: objectOf(object).isRequired,
  title: node.isRequired,
  description: node.isRequired,
  small: node,
  color: oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  text: string
};

export default withStyles(styles)(AppCardRegular);
