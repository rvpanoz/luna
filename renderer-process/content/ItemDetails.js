import {remote, ipcRenderer} from 'electron';
import React from 'react';

const StaticListItem = (props) => {
  return (
    <li>{props.name}</li>
  )
}

const StaticList = (props) => {
  let items = props.data, data;
  if(Object.prototype.toString.call(items) !== '[object Array]' ) {
    data = [];
    for(let z in items) {
      data.push(`${z} - ${items[z]}`);
    }
  } else {
    data = items;
  }
  return (
    <ul className="static-list">
      {data.map((name, idx) => {
        return <StaticListItem key={idx} name={name}/>
      })}
    </ul>
  )
}

export default class ListItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.uninstall = this.uninstall.bind(this);
  }
  uninstall(e) {
    debugger;
    e.preventDefault();
    let module = this.props.module;
    ipcRenderer.send('uninstall-module', module.name);
  }
  render() {
    let module = this.props.module;
    if (!module) {
      return null;
    }
    console.log(module);
    return (
      <div className="module-details">
        <div className="detail tile">
          <section className="detail-body">
            <div className="detail-top">
              <h2 className="detail-heading">{module.name}</h2>
                <span className="badge badge-orange version">
                  v{module.version}
                </span>
              <a onClick={this.uninstall} href="#" style={{float: 'right'}} className="btn btn-danger btn-sm">Uninstall</a>
            </div>
            <p>
              {module.description}
            </p>
            <div className="tab-wrap">
              <input id="tab1" type="radio" name="tabs" defaultChecked/>
              <label htmlFor="tab1">Details</label>
              <input id="tab2" type="radio" name="tabs"/>
              <label htmlFor="tab2">Contributors</label>
              <input id="tab3" type="radio" name="tabs"/>
              <label htmlFor="tab3">Dependencies</label>
              <section id="content1">
                <p className="detail-tags">{module.author}</p>
              </section>
              <section id="content2">
                <StaticList data={module.maintainers} />
              </section>
              <section id="content3">
                <StaticList data={module.dependencies} />
              </section>
            </div>
          </section>
          <footer className="detail-footer">
            <ul className="detail-links">
              <li></li>
              <li></li>
            </ul>
          </footer>
        </div>
      </div>
    )
  }
}
