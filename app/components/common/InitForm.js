import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputBase from '@material-ui/core/InputBase';

import styles from './styles/initForm';

const InitPackageForm = ({ classes, onClose }) => (
  <section className={classes.root}>
    <div className={classes.form}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormHelperText>Name</FormHelperText>
          <div className={classes.formItem}>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormHelperText>Version</FormHelperText>
          <div className={classes.formItem}>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              placeholder="1.0.0"
            />
          </div>
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormHelperText>Entry point</FormHelperText>
          <div className={classes.formItem}>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              placeholder="index.js"
            />
          </div>
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormHelperText>Git repository</FormHelperText>
          <div className={classes.formItem}>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormHelperText>Description</FormHelperText>
          <div className={classes.formItem}>
            <InputBase
              multiline
              className={classes.description}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
        </FormGroup>
      </FormControl>
    </div>
    <Divider light />
    <div className={classes.actions}>
      <Button onClick={() => onClose()} color="secondary">
        Cancel
      </Button>
      <Button onClick={() => npmInit()} color="primary" autoFocus>
        Create
      </Button>
    </div>
  </section>
);

InitPackageForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(InitPackageForm);
