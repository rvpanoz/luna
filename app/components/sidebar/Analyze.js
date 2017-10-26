import React from 'react';

class Analyze extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let installed = this.props.packagesInstalled;
    let outdated = this.props.packagesOutdated;
    let t1=installed,t2=0;

    if(outdated instanceof Array && outdated.length) {
      t2 = outdated.length;
    } else {
      if(outdated) {
        t2 = Object.keys(outdated).length;
      }
    }

    return (
      <section className="sidebar__analyze">
        <div className="sidebar__btn">
          <a className="btn btn-block btn-default" href="#">
            Analyze package
          </a>
        </div>
        <div className="sidebar__title">Packages</div>
        <ul className="nav nav-menu">
          <li className="active">
            <a href="#">
              <div className="nav-menu__ico">
                <i className="fa fa-fw fa-inbox"></i>
              </div>
              <div className="nav-menu__text">
                <span>Installed</span>
              </div>
              <div className="nav-menu__right">
                <i className="badge badge-default">
                  <b>{t1}</b>
                </i>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="nav-menu__ico">
                <i className="fa fa-fw fa-upload"></i>
              </div>
              <div className="nav-menu__text">
                <span>Outdated</span>
              </div>
              <div className="nav-menu__right">
                <i className="badge badge-default">
                  {t2}
                </i>
              </div>
            </a>
          </li>
        </ul>
      </section>
    )
  }
}

export default Analyze
