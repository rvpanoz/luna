import { remote, ipcRenderer } from "electron";
import React from "react";
import Loader from "../../common/Loader";
import PackageListItem from "./PackagesListItem";
import { withStyles } from "material-ui/styles";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import styles from "./PackagesList.css";

class PackagesList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { toggleLoader } = this.props;
    toggleLoader(true);
  }
  render() {
    const { packages, loading, toggleMainLoader, setActive } = this.props;

    return (
      <section>
        <h3 className={styles.heading}>Packages</h3>
        <Loader loading={loading}>
          <List>
            {packages
              ? packages.map((pkg, idx) => {
                  let hasPeerMissing = pkg.peerMissing;
                  if (hasPeerMissing) {
                    return;
                  }
                  let version = pkg.version;
                  let readme = pkg.readme;
                  let name = pkg.from ? pkg.from.split("@")[0] : pkg.name;
                  return (
                    <PackageListItem
                      setActive={setActive}
                      toggleMainLoader={toggleMainLoader}
                      deselectAll={this.deselectAll}
                      idx={idx}
                      key={idx}
                      name={name}
                      readme={readme}
                      description={pkg.description ? pkg.description : null}
                      version={version}
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

export default PackagesList;
