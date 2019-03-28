/* eslint-disable prefer-destructuring */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ControlTypes from 'components/common/ControlTypes';
import Typography from '@material-ui/core/Typography';
import { addInstallOption } from 'models/packages/actions';

import styles from './styles/flags';

const mapState = ({
  modules: {
    operations: { packagesInstallOptions }
  }
}) => ({
  packagesInstallOptions
});

const Flags = ({ classes, selected }) => {
  const dispatch = useDispatch();
  const { packagesInstallOptions } = useMappedState(mapState);

  return (
    <div className={classes.flexContainer}>
      <List dense className={classes.list}>
        {selected.map(packageName => {
          const option =
            packagesInstallOptions &&
            packagesInstallOptions.find(
              installOption => installOption.name === packageName
            );
          let value;

          if (option) {
            value = option.options[0];
          }

          return (
            <ListItem key={packageName}>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">{packageName}</Typography>
                }
              />
              <ListItemSecondaryAction>
                <ControlTypes
                  selectedValue={value}
                  packageName={packageName}
                  onSelect={payload => dispatch(addInstallOption(payload))}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

Flags.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Flags);
