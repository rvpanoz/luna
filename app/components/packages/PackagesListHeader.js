import React from 'react';
import { remote, ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { APP_MODES } from '../../constants/AppConstants';
import { withStyles } from 'material-ui/styles';
import * as globalActions from '../../actions/global_actions';
import * as packagesActions from '../../actions/packages_actions';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import classnames from 'classnames';
import { packagesListStyles } from '../styles';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const ITEM_HEIGHT = 48;

class PackagesListHeader extends React.Component {
  constructor() {
    super();
    this._anchorEl = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this._setGlobalMode = this._setGlobalMode.bind(this);
  }
  handleClick(e) {
    this._anchorEl = e.currentTarget;
    this.forceUpdate();
  }
  handleClose(e) {
    this._anchorEl = null;
    this.forceUpdate();
  }
  _setGlobalMode(e) {
    const { mode, toggleLoader, setMode } = this.props;
    e.preventDefault();
    if (mode === APP_MODES.GLOBAL) return;
    toggleLoader(true);
    setMode(APP_MODES.GLOBAL, null);
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['outdated', 'list'],
      mode: APP_MODES.GLOBAL,
      directory: null
    });
  }
  render() {
    const {
      classes, setActive, toggleLoader, total, mode, directory
    } = this.props;
    const anchorEl = this._anchorEl;

    return (
      <section className={classes.flexColumn}>
        <div className={classes.flexRow}>
          <h3 className={classes.heading}>Packages</h3>
          <Avatar className={classes.pinkAvatar}>{total}</Avatar>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.iconbutton}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              PaperProps={{
								style: {
									maxHeight: ITEM_HEIGHT * 4.5,
									width: 200
								}
							}}
            >
              <MenuItem key="1" onClick={(e) => console.log(e.target)}>
								Sort by name
              </MenuItem>
              <MenuItem key="2" onClick={(e) => console.log(e.target)}>
								Sort by outdated
              </MenuItem>
            </Menu>
          </div>
          <Divider />
        </div>
        <div className={classes.flexRow} style={{ display: 'none' }}>
          <Chip label={mode} className={classes.chip} />
          <Typography
            align="right"
            paragraph
            type="subheading"
            className={classes.directory}
          >
            {directory}
          </Typography>
        </div>
        <Divider />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    total: state.packages.total,
    mode: state.global.mode,
    directory: state.global.directory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTotal: (total) => dispatch(packagesActions.setTotal(total))
  };
}

export default compose(
  withStyles(packagesListStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(PackagesListHeader);
