import {remote, ipcRenderer} from 'electron';
import React from 'react';
import AppLoader from './../common/AppLoader';

const OptionItems = (props) => {
  return (
    <option id={props.idx}>{props.name}</option>
  )
}

const StaticListItem = (props) => {
  return (
    <p>
      {props.name}
    </p>
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
    <div className="static-list">
      {data.map((name, idx) => {
        return <StaticListItem key={idx} name={name}/>
      })}
    </div>
  )
}

export default class ItemDetails extends React.Component {
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
      message: `This action will uninstall ${module.name} from your system. \nAre you sure? `,
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
    ipcRenderer.send('get-info-by-version', this.props.module.name, version);
  }
  componentDidUpdate() {

  }
  componentDidMount() {
    let root = this.moduleDetails;
    if (root) {
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
              <h2 className="detail-heading">{module.name}</h2>
              <p>
                <label>Latest&nbsp;</label>&nbsp;v{module['dist-tags'].latest}
              </p>
              <div className="flex-row">
                <div className="versions">
                  <form className="form">
                    <div className="form-group flex-row">
                      <label className="control-label" style={{
                        marginTop: '5px',
                        marginRight: '15px'
                      }}>Versions</label>
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
            <div className="tab-wrap">
              <input id="tab1" type="radio" name="tabs" defaultChecked/>
              <label htmlFor="tab1">Details</label>
              <input id="tab2" type="radio" name="tabs"/>
              <label htmlFor="tab2">Contributors</label>
              <input id="tab3" type="radio" name="tabs"/>
              <label htmlFor="tab3">Dependencies</label>
              <section id="details-content">
                <p className="detail-tags">{module.author}</p>
                <div className="detail-description">
                  {module.description}
                </div>
              </section>
              <section id="contributors-content">
                <StaticList data={module.maintainers}/>
              </section>
              <section id="dependencies-content">
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
