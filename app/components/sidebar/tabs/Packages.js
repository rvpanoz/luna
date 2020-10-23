import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Update';
import { AppLoader } from 'components/common';
import { iMessage } from 'commons/utils';
import styles from './styles/packages';

const Loader = ({ classes }) => (
  <div className={classes.loading}>Loading..</div>
);

Loader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const WithStylesLoader = withStyles(styles)(Loader);

const Item = ({ classes, name, primaryText, secondaryText }) => {
  return (
    <ListItem
      key={`package-${name}`}
      className={classes.listItem}
      disableGutters
      dense
    >
      <ListItemText
        primary={
          <div className={classes.flexContainer}>
            <Typography color="textSecondary" variant="h5">
              {primaryText}
            </Typography>
          </div>
        }
      />
      <ListItemSecondaryAction>
        <Typography color="textSecondary" variant="h4">
          {secondaryText}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

Item.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.number,
};

const WithStylesItem = withStyles(styles)(Item);

const PackagesTab = ({
  classes,
  items,
  loading,
  updatedAt,
  fromSearch,
  projectInfo,
  npmEnv,
  mode,
}) => {
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {iMessage('title', 'overview')}
          </Typography>
          <Divider />
          <div className={classes.content}>
            {loading && !fromSearch ? (
              <WithStylesLoader />
            ) : (
              <List disablePadding>
                {items && items.map((item) => <WithStylesItem {...item} />)}
              </List>
            )}
          </div>
        </CardContent>
        <Divider />
        <CardActions>
          <div className={classes.cardFlexContainer}>
            <div className={classes.cardFlexContainerInner}>
              <UpdateIcon className={classes.updateIcon} />
              <Typography variant="caption" color="textSecondary">
                {iMessage('info', 'updatedAt')}
              </Typography>
            </div>
            <Typography variant="caption" color="textSecondary">
              {updatedAt !== null ? updatedAt : '...'}
            </Typography>
          </div>
        </CardActions>
      </Card>
    </>
  );
};

PackagesTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  projectInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  fromSearch: PropTypes.bool,
  updatedAt: PropTypes.string,
  npmEnv: PropTypes.object,
};

export default withStyles(styles)(PackagesTab);
