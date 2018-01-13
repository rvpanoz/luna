import React from "react";
import OutdatedListItem from "./OutdatedListItem";

export default class OutdatedPackages extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let outdatedPackages = this.props.packages;
    let packages = [];
    for (let x in outdatedPackages) {
      let name = x;
      let details = outdatedPackages[name];
      packages.push({ name, details });
    }

    return (
      <section className="sidebar__packages">
        <div className="sidebar__title">Outdated</div>
        <div className="lm-widget">
          <div className="lm-widget__list">
            {packages && packages.length ? (
              packages.map((pkg, idx) => {
                return (
                  <OutdatedListItem
                    key={idx}
                    package={pkg}
                    setActive={this.props.setActive}
                    toggleMainLoader={this.props.toggleMainLoader}
                    mode={this.props.mode}
                  />
                );
              })
            ) : (
              <small style={{ paddingLeft: "11px" }}>
                Everything is updated!
              </small>
            )}
          </div>
        </div>
      </section>
    );
  }
}
