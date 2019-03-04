/* eslint-disable react/require-default-props */

import React, { useCallback } from 'react';
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

import AppLoader from 'components/common/AppLoader';
import { switchcase } from 'commons/utils';
import styles from './styles/appCardStyles';

const AppCard = ({
  classes,
  title,
  subtitle,
  description,
  footerText,
  iconColor,
  iconHeader,
  avatar,
  total,
  loading,
  link
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
      {iconHeader && (
        <CardHeader
          classes={{
            root: cn(classes.cardHeader, classes[`${iconColor}CardHeader`]),
            avatar: classes.cardAvatar,
            title: classes.cardTitle,
            subheader: classes.cardSubtitle,
            content: classes.cardHeaderContent
          }}
          avatar={avatar && renderIconHeader(iconHeader)}
          title={title}
          subheader={subtitle}
        />
      )}
      <CardContent
        classes={{
          root: classes.cardContent
        }}
      >
        <AppLoader loading={loading}>
          <div className={classes.content}>
            <Typography variant="subtitle1" className={classes.cardCategory}>
              {description}
            </Typography>
            <Typography variant="body2" className={classes.cardDescription}>
              {total}
            </Typography>
          </div>
        </AppLoader>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={cn(classes.flexItem, classes.textLeft)}>
          <UpdateIcon
            className={cn(classes.cardStatsIcon, classes[`${iconColor}Icon`])}
          />
        </div>
        {link ? (
          <a href={link.href} className={classes.cardLink}>
            {link.text}
          </a>
        ) : footerText ? (
          <div className={cn(classes.flexItem, classes.textRight)}>
            <Typography variant="caption">{footerText}</Typography>
          </div>
        ) : null}
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
  link: PropTypes.objectOf(PropTypes.string),
  footerText: PropTypes.string,
  iconColor: PropTypes.string,
  iconHeader: PropTypes.string,
  avatar: PropTypes.bool
};

export default withStyles(styles)(AppCard);
