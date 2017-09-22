/**
 * List component
 *
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import AppLoader from './../common/AppLoader';

class ListItemDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(newProps) {

  }
  render() {
    let is_visible = this.props.isVisible;
    let module = this.props.module;

    if(!module) {
      return null;
    }
    return (
      <div className="module-details">
        <div className={(is_visible)
          ? 'show'
          : 'hide'}>
          <article className="article tile">
            <section className="article-body">
              <p className="article-tags">{module.author}</p>
              <h2 className="article-heading">{module.name}</h2>
              <p>
                {module.description}
              </p>
            </section>
            <footer className="article-footer">
              <ul className="article-links">
                <li>

                </li>
                <li>

                </li>
              </ul>
            </footer>
          </article>
        </div>
      </div>
    )
  }
}

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: []
    }
    this.onItemClick = this.onItemClick.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }
  onItemClick(e) {
    e.preventDefault();
    let root = this.refs[`root-${this.props.idx}`];
    root.classList.add('selected');
    this.getInfo();
    return false;
  }
  getInfo(e) {
    ipcRenderer.send('get-package-info', this.props);
  }
  componentDidMount() {
    ipcRenderer.send('get-latest-version', this.props);
  }
  render() {
    return (
      <tr ref={`root-${this.props.idx}`}>
        <td>
          <a onClick={this.onItemClick} href="#">{this.props.name}</a>
        </td>
        <td style={{
          textAlign: 'right'
        }}>
          {this.props.info.version}
        </td>
      </tr>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      detail: false,
      active_module: null,
      modules: []
    }
  }
  componentWillMount() {
    this.setState({
      loader: true
    }, () => {
      ipcRenderer.send('get-global-modules');
    });
  }
  componentDidMount() {
    ipcRenderer.on('get-latest-version-reply', (event, data) => {});
    ipcRenderer.on('get-package-info-reply', (event, data) => {
      console.log(data);
      this.setState({active_module: data, detail: true});
    });
    ipcRenderer.on('get-global-modules-reply', (event, modules) => {
      let root = this.refs.root;
      if (root) {
        let data = this.parse(modules);
        this.setState({modules: data, loader: false, detail: false});
      }
    });
  }
  componentWillUnmount() {
    this.setState({loader: false, detail: false, modules: []});
  }
  parse(data) {
    let modules = data.dependencies;
    let arr = [];

    for (let z in modules) {
      let mod = {
        name: z,
        info: modules[z]
      }
      arr.push(mod);
    }
    return arr;
  }
  render() {
    let modules = this.state.modules;
    if (!modules) {
      return null;
    }

    return (
      <div className="modules-list table-responsive">
        <AppLoader isVisible={this.state.loader}/>
        <div className="row">
          <div className="col-lg-6 cold-md-6 col-xs-6">
            <h4 className="title">
              <i className="fa fa-file red"></i>&nbsp; Modules list
            </h4>
            <p className="help">{`List of global modules installed in your system`}</p>
            <table className="table" ref="root">
              <tbody>
                {modules.map((module, idx) => {
                  return <ListItem idx={idx} key={idx} {...module}/>
                })}
              </tbody>
            </table>
          </div>
          <div className="col-lg-6 cold-md-6 col-xs-6">
            <ListItemDetails module={this.state.active_module} isVisible={this.state.detail}/>
          </div>
        </div>
      </div>
    )
  }
}

export default List;
