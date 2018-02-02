import { remote, ipcRenderer } from 'electron';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { appHeaderStyles } from '../styles';

class SearchBox extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e) {
      e.preventDefault();
    }
    const {
      mode, directory, toggleLoader, setActive, setPackageActions
    } = this.props;
    const value = e.target.value;

    if (value && value.length > 2) {
      toggleLoader(true);
      ipcRenderer.send('ipc-event', {
        ipcEvent: 'search-packages',
        cmd: ['search'],
        pkgName: value
      });
    }
    return false;
  }
  componentDidMount() {
    const root = this.refs.root;
    if (root) {
      root.addEventListener('keypress', this._onKeyUp);
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <TextField
        error
        id="search"
        color="secondary"
        label="Search npm"
        InputLabelProps={{ className: classes.searchBoxLabel }}
        inputProps={{ className: classes.searchBoxInput }}
        onChange={this.handleChange}
      />
    );
  }
}

export default withStyles(appHeaderStyles)(SearchBox);
