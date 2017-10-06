import React from 'react';

class PackageDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pkg = this.props.pkg;
    if(!pkg) {
      return null;
    }
    return (
        <div className="tab-wrap">
          <input id="tab1" type="radio" name="tabs" defaultChecked/>
          <label htmlFor="tab1">Details</label>
          <input id="tab2" type="radio" name="tabs"/>
          <label htmlFor="tab2">Contributors</label>
          <input id="tab3" type="radio" name="tabs"/>
          <label htmlFor="tab3">Dependencies</label>
          <section id="details-content">
            <div className="description">
              {pkg.description}
            </div>
          </section>
          <section id="contributors-content"></section>
          <section id="dependencies-content"></section>
        </div>
    )
  }
}

export default PackageDetails;
