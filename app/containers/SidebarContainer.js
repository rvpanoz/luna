import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import QuickMenu from '../components/sidebar/QuickMenu';
import Analyze from '../components/sidebar/Analyze';
import Settings from '../components/sidebar/Settings';
import OutdatedList from '../components/sidebar/OutdatedList';

class SidebarContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleSidebarContent = this.handleSidebarContent.bind(this);
  }
  handleSidebarContent(idx) {
    let sidebarContent = this.refs.sidebarContent;
    let menus = sidebarContent.querySelectorAll('.sidebar__menu');

    for (let i = 0; i < menus.length; i++) {
      menus[i].classList.remove('active');
    }

    if(menus && menus[idx]) {
      menus[idx].classList.add('active');
      menus[0].style['margin-left'] = '-'+idx*menus[idx].offsetWidth+'px';
    }
  }
  render() {
    let props = this.props;
    let items = ['fa-bars', 'fa-feed', 'fa-cog'];

    return (
      <div className="sidebar">
        <QuickMenu items={items} handleSidebarContent={this.handleSidebarContent}/>
        <div className="scroll-wrapper scrollable" style={{position: 'relative'}}>
            <div className="scrollable scroll-content">
              <div className="sidebar__cont" ref="sidebarContent">
                <div className="sidebar__menu active">
                  <Analyze packagesOutdated={props.packagesOutdated} packagesInstalled={props.packagesInstalled}/>
                </div>
                <div className="sidebar__menu">
                  <OutdatedList packages={props.packagesOutdated} toggleMainLoader={props.actions.toggleMainLoader} setActive={props.actions.setActive}/>
                </div>
                <div className="sidebar__menu">
                  <Settings/>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.global.messages,
    packages: state.packages.packages,
    packagesInstalled: state.packages.totalInstalled,
    packagesOutdated: state.packages.packagesOutdated
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer)
