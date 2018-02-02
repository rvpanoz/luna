/**
Layout component
* */

import { remote, ipcRenderer } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import * as globalActions from 'actions/global_actions';
import AppHeader from '../components/header/AppHeader';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import PackagesContainer from './Packages';
import { layoutStyles } from './styles';

class Layout extends React.Component {
  constructor() {
    super();
    this.handleModal = this.handleModal.bind(this);
  }
  getModalStyles() {
    function rand() {
      return Math.floor(Math.random() * 20) - 10;
    }

    const top = 50 + rand();
    const left = 50 + rand();

    return {
      position: 'absolute',
      width: 8 * 50,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #e5e5e5',
      backgroundColor: '#fff',
      boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
      padding: 8 * 4
    };
  }

  handleModal() {
    const { closeSettings } = this.props;
    closeSettings();
  }

  componentDidMount() {
    const { setSettings } = this.props;

    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-settings',
      cmd: 'config',
      pkgName: 'list' // hack
    });

    ipcRenderer.on('get-settings-close', (event, settings) => {
      try {
        const settingsList = JSON.parse(settings);
        setSettings(settingsList);
      } catch (e) {
        throw new Error(e);
      }
    });
  }

  render() {
    const {
      classes,
      theme,
      settings,
      menuOpen,
      handleDrawerOpen,
      settingsOpen,
      handleDrawerClose
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppHeader
            title="Luna"
            theme={theme}
            menuOpen={menuOpen}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          />
          <main className={classes.content}>
            <Grid container justify="space-between">
              <Grid item xs={12}>
                <PackagesContainer />
              </Grid>
            </Grid>
          </main>
          <div className="app-modal">
            <Modal
              aria-labelledby="settings"
              aria-describedby="set npm settings"
              open={settingsOpen}
              onClose={this.handleModal}
            >
              <div style={this.getModalStyles()} className={classes.paper}>
                <form className={classes.container} noValidate autoComplete="off">
                  <h3 className={classes.heading}>Settings</h3>
                  <Divider />
                  <TextField
                    id="npm-registry"
                    label="Registry"
                    className={classes.textField}
                    value={(settings && settings.registry) || ''}
                    margin="normal"
                  />
                  <br />
                  <TextField
                    id="npm-proxy-http"
                    label="Proxy http"
                    className={classes.textField}
                    value={(settings && settings.proxy) || ''}
                    margin="normal"
                  />
                  <br />
                  <TextField
                    id="npm-proxy-https"
                    label="Proxy https"
                    className={classes.textField}
                    value={(settings && settings['https-proxy']) || ''}
                    margin="normal"
                  />
                  <div
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
                  >
                    <Button className={classes.button}>Save</Button>
                    <Button onClick={this.handleModal} className={classes.button}>
											Close
                    </Button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuOpen: state.global.menuOpen,
    settingsOpen: state.global.settingsOpen,
    settings: state.global.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSettings: (settings) => dispatch(globalActions.setSettings(settings)),
    closeSettings: () => dispatch(globalActions.toggleSettings(false)),
    handleDrawerOpen: () => dispatch(globalActions.handleDrawer(true)),
    handleDrawerClose: () => dispatch(globalActions.handleDrawer(false))
  };
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default compose(
  withStyles(layoutStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Layout);
