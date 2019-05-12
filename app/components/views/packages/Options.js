/* eslint-disable prefer-destructuring */
/* eslint-disable react/require-default-props */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ControlTypes from 'components/common/ControlTypes';
import Typography from '@material-ui/core/Typography';

import { addInstallOption } from 'models/common/actions';
import { INFO_MESSAGES } from 'constants/AppConstants';

import styles from './styles/flags';

const Options = ({ classes, packagesInstallOptions, selected }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    selected.forEach(selectedPackages =>
      dispatch(
        addInstallOption({
          name: selectedPackages,
          options: ['save-prod']
        })
      )
    );
  }, [selected, dispatch]);

  return (
    <div className={classes.flexContainer}>
      <Typography variant="subtitle1" className={classes.title}>
        {INFO_MESSAGES.installing}
      </Typography>
      <List dense className={classes.list}>
        {selected.map(packageName => {
          const option =
            packagesInstallOptions &&
            packagesInstallOptions.find(
              installOption => installOption.name === packageName
            );

          return (
            <ListItem key={packageName}>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">{packageName}</Typography>
                }
              />
              <ListItemSecondaryAction>
                <ControlTypes
                  selectedValue={option && option.options[0]}
                  packageName={packageName}
                  onSelect={({ name, options }) =>
                    dispatch(
                      addInstallOption({
                        name,
                        options
                      })
                    )
                  }
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

Options.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  packagesInstallOptions: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(Options);
