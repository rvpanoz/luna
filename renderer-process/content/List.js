/**
 * List component
 *
 * shows global installed modules
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';

class ListItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.info.version}</td>
      </tr>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: []
    }
  }
  componentWillMount() {
    ipcRenderer.send('get-global-modules');
    this.props.onLoad(true);
  }
  componentDidMount() {
    let self = this;
    ipcRenderer.on('get-global-modules-reply', (event, modules) => {
      let data = this.parse(modules);
      self.setState({
        modules: data
      }, () => {
        this.props.onLoad(false);
      })
    });
  }
  componentWillUnmount() {
    this.setState({
      modules: []
    });
  }
  parse(data) {
    let modules = data.dependencies;
    let arr = [];

    for(let z in modules) {
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
    if(!modules) {
      return null;
    }
    return (
      <section className="section_modules">
        <table className="table">
          <tbody>
            {modules.map((module, idx) => {
              return <ListItem key={idx} {...module}/>
            })}
          </tbody>
        </table>
      </section>
    )
  }
}


export default List;
