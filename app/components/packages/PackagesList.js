/**
PackagesList
**/

"use strict";

import { remote, ipcRenderer } from "electron";
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Loader from "../../common/Loader";
import PackageListItem from "./PackagesListItem";
import { withStyles } from "material-ui/styles";
import * as globalActions from "../../actions/global_actions";
import List from "material-ui/List";
import { packagesListStyles } from "../styles";
import PackagesListHeader from "./PackagesListHeader";

class PackagesList extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const { toggleLoader } = this.props;
    toggleLoader(true);
  }
  render() {
    const {
      packages,
      loading,
      mode,
      toggleMainLoader,
      toggleLoader,
      setActive,
      setPackageActions,
      setGlobalMode,
      directory,
      classes
    } = this.props;

    return (
      <section>
        <PackagesListHeader
          mode={mode}
          total={packages.length}
          setGlobalMode={setGlobalMode}
          directory={directory}
          setActive={setActive}
          toggleLoader={toggleLoader}
          setPackageActions={setPackageActions}
        />
        <Loader loading={loading}>
          <List>
            {packages
              ? packages.map((pkg, idx) => {
                  const hasPeerMissing = pkg.peerMissing;
                  if (hasPeerMissing) {
                    return;
                  }
                  const version = pkg.version;
                  const readme = pkg.readme;
                  const name = pkg.from ? pkg.from.split("@")[0] : pkg.name;
                  const latest = pkg.latest;
                  return (
                    <PackageListItem
                      setActive={setActive}
                      toggleMainLoader={toggleMainLoader}
                      idx={idx}
                      key={idx}
                      name={name}
                      readme={readme}
                      description={pkg.description ? pkg.description : null}
                      version={version}
                      latest={latest}
                    />
                  );
                })
              : null}
          </List>
        </Loader>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.global.loading,
    packages: state.packages.packages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool))
  };
}

export default compose(
  withStyles(packagesListStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PackagesList);
