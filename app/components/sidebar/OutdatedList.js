import React from 'react';
import OutdatedListItem from './OutdatedListItem';

export default class OutdatedPackages extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let packagesObj = this.props.packages;
    let packages = [];
    for(let x in packagesObj) {
      let name = x;
      let details = packagesObj[name];
      packages.push({
        name,
        details
      });
    }
    
    return (
      <section className="sidebar__packages">
        <div className="sidebar__title">
          Outdated packages
        </div>
        <div className="outdated">
          <div className="outdated__cont">
            <div className="outdated__list">
              {
                (packages && packages.length) ? packages.map((pkg, idx) => {
                return <OutdatedListItem key={idx} package={pkg}/>
              }) : null
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}
