/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import HomeIcon from '@material-ui/icons/Home';
import ErrorIcon from '@material-ui/icons/Error';
import UpdateIcon from '@material-ui/icons/Update';
import DependenciesIcon from '@material-ui/icons/List';
import OutdatedIcon from '@material-ui/icons/VerticalSplit';

import { switchcase } from 'commons/utils';
import styles from './styles/appCardStyles';

const AppCard = ({
  classes,
  title,
  description,
  small,
  footerText,
  statIconColor,
  iconColor,
  iconHeader,
  avatar
}) => {
  const renderIconHeader = icon =>
    switchcase({
      home: () => <HomeIcon className={classes.cardIcon} />,
      error: () => <ErrorIcon className={classes.cardIcon} />,
      dependencies: () => <DependenciesIcon className={classes.cardIcon} />,
      outdated: () => <OutdatedIcon className={classes.cardIcon} />
    })(<HomeIcon className={classes.cardIcon} />)(icon);

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: cn(classes.cardHeader, classes[`${iconColor}CardHeader`]),
          avatar: classes.cardAvatar
        }}
        avatar={avatar && renderIconHeader(iconHeader)}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="subtitle1" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.cardDescription}>
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardFooter}>
          <UpdateIcon
            className={cn(
              classes.cardStatsIcon,
              classes[`${statIconColor}CardStatsIcon`]
            )}
          />
          {footerText && (
            <Typography variant="caption">{footerText}</Typography>
          )}
        </div>
      </CardActions>
    </Card>
  );
};

AppCard.defaultProps = {
  loading: false
};

AppCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  small: PropTypes.string,
  footerText: PropTypes.string,
  statIconColor: PropTypes.string,
  iconColor: PropTypes.string,
  iconHeader: PropTypes.string,
  avatar: PropTypes.bool
};

export default withStyles(styles)(AppCard);
