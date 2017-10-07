import React from 'react';
import { StaticList } from '../../common/Statics';

class PackageDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pkg = this.props.pkg;
    if (!pkg) {
      return null;
    }
    return (
      <div className="package-details">
        <div className="package-details__head">
          <div className="package-details__tag">
            <i className="fa fa-fw fa-tag"></i>
          </div>
          <div className="package-details__title">
            {pkg.name}&nbsp;v{pkg.version}
          </div>
          <div className="package-details__settings dropdown">
            <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a href="compose.html">
                  <i className="fa fa-fw fa-reply"></i>
                  <span>Update</span>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fa fa-fw fa-trash"></i>
                  <span>Uninstall</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="package-details__info">
          <div className="package-details__name">
            <span>Latest:&nbsp;v{pkg['dist-tags'].latest}</span>
          </div>
          <div className="package-details__date">
            <span>{pkg.license}</span>
          </div>
        </div>
        <div className="package-details__body">
          <div className="package-details__text">{pkg.description}</div>
            <div className="package-details__tabs tab-wrap">
              <input id="tab1" type="radio" name="tabs" defaultChecked/>
              <label htmlFor="tab1">Dependencies</label>
              <input id="tab2" type="radio" name="tabs"/>
              <label htmlFor="tab2">Contributors</label>
              <section id="dependencies-content">
                <StaticList data={pkg.dependencies}/>
              </section>
              <section id="contributors-content">
                <StaticList data={pkg.maintainers}/>
              </section>
            </div>
        </div>
      </div>
    )
  }
}

export default PackageDetails;
