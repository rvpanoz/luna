/**
 * Common Loader component
 */

"use strict";

import React from "react";
import Loader from "material-ui/Progress/CircularProgress";

const AppLoader = (props) => {
  const { loading } = props;
  return loading ? <Loader /> : props.children;
};

export default AppLoader;
