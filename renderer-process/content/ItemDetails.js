import {remote, ipcRenderer} from 'electron';
import React from 'react';

const OptionItems = (props) => {
  return (
    <option id={props.idx}>{props.name}</option>
  )
}

const StaticListItem = (props) => {
  return (
    <li>{props.name}</li>
  )
}

const StaticList = (props) => {
  let items = props.data,
    data;
  if (Object.prototype.toString.call(items) !== '[object Array]') {
    data = [];
    for (let z in items) {
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
    this.state = {
      active: null
    }
    this.uninstall = this.uninstall.bind(this);
    this.onChangeVersion = this.onChangeVersion.bind(this);
  }
  uninstall(e) {
    e.preventDefault();
    let module = this.props.module;
    remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      message: `This action will uninstall ${module.name} - ${module.version} from your system. \nAre you sure? `,
      buttons: ['OK', 'CANCEL']
    }, (btnIdx) => {
      switch (btnIdx) {
        case 0:
          ipcRenderer.send('uninstall-module', module.name);
          break;
        default:
          return;
      }
    });
  }
  onChangeVersion(e) {
    let version = e.target.value;
    let module = this.props.module;
    ipcRenderer.send('get-info-by-version', module.name, version);
  }
  componentDidMount() {
    let root = this.moduleDetails;
    if(root) {
      ipcRenderer.on('get-info-by-version-reply', (event, info) => {
        console.log(info);
      });
    }
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners('get-info-by-version-reply');
  }
  render() {
    let module = this.props.module;
    if (!module) {
      return null;
    }
    
    return (
      <div className="module-details" ref={(el) => {
          this.moduleDetails = el;
        }}>
        <div className="detail tile">
          <section className="detail-body">
            <div className="detail-top">
              <h2 className="detail-heading">{module.name}&nbsp;<span className="badge badge-orange version">
                v{module.version}
              </span></h2>
              <div className="flex-row">
                <div className="versions">
                  <form className="form">
                    <div className="form-group">
                      <label className="control-label">Versions</label>
                      <select className="form-control" id="versions" onChange={this.onChangeVersion}>
                        <option>Select version</option>
                        {module.versions.map((version, idx) => {
                          return <OptionItems name={version} key={idx}/>
                        })}
                      </select>
                    </div>
                  </form>
                </div>
                <div className="actions">
                  <a onClick={this.uninstall} href="#" style={{
                    float: 'right'
                  }} className="btn btn-red btn-sm">Uninstall</a>
                </div>
              </div>
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
                <StaticList data={module.maintainers}/>
              </section>
              <section id="content3">
                <StaticList data={module.dependencies}/>
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
