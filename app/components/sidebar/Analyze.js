import React from 'react';

class Analyze extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
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
            <a href="inbox.html">
              <div className="nav-menu__ico">
                <i className="fa fa-fw fa-inbox"></i>
              </div>
              <div className="nav-menu__text">
                <span>Installed</span>
              </div>
              <div className="nav-menu__right">
                <i className="badge badge-default">
                  <b>17</b>
                </i>
              </div>
            </a>
          </li>
          <li>
            <a href="sent.html">
              <div className="nav-menu__ico">
                <i className="fa fa-fw fa-upload"></i>
              </div>
              <div className="nav-menu__text">
                <span>Outdated</span>
              </div>
              <div className="nav-menu__right">
                <i className="badge badge-default">7</i>
              </div>
            </a>
          </li>
        </ul>
      </section>
    )
  }
}

export default Analyze
