/**
 * Base Layout
 */

"use strict";

import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import Grid from "material-ui/Grid";
import AppHeader from "../components/AppHeader";
import Sidebar from "./Sidebar";
import PackagesContainer from "./Packages";
import PackageContainer from "./Package";
import styles from "./Layout.css";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this._getElementByPosition = this._getElementByPosition.bind(this);
  }
  _getElementByPosition(position) {
    const { children } = this.props;
    return R.filter(
      R.where({
        props: R.propEq("position", position)
      })
    )(children)[0];
  }
  render() {
    return (
      <section>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <AppHeader title="eurobank" />
          </Grid>
        </Grid>
        <div className={styles.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Sidebar />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PackagesContainer />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PackageContainer />
            </Grid>
          </Grid>
        </div>
      </section>
    );
  }
}

export default Layout;
