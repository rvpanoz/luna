import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import TotalIcon from '@material-ui/icons/ListOutlined';
import OutdatedIcon from '@material-ui/icons/UpdateOutlined';
import ProblemsIcon from '@material-ui/icons/WarningOutlined';

import { switchcase } from 'commons/utils';
import styles from './styles/packages';

const PackagesTab = ({ classes, items }) => (
  <div className={classes.tab}>
    <List dense>
      {items &&
        items.map(item => (
          <ListItem key={`packages-${item.name}`} className={classes.listItem}>
            <ListItemText
              primary={
                <div className={classes.containerHolder}>
                  {switchcase({
                    Totals: () => (
                      <TotalIcon
                        className={cn(classes.icon, classes.primaryColor)}
                      />
                    ),
                    Outdated: () => (
                      <OutdatedIcon
                        className={cn(classes.icon, classes.warningColor)}
                      />
                    ),
                    Problems: () => (
                      <ProblemsIcon
                        className={cn(classes.icon, classes.errorColor)}
                      />
                    )
                  })(<TotalIcon className={classes.icon} />)(item.primaryText)}
                  <Typography className={classes.title} component="span">
                    {item.primaryText}
                  </Typography>
                </div>
              }
            />
            <ListItemSecondaryAction>
              <Typography className={classes.stats} component="span">
                {item.secondaryText}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  </div>
);

PackagesTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(PackagesTab);
