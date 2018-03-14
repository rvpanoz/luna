/**
 * HOC for List and ListHeader
 *
 **/

import { ipcRenderer } from "electron";
import { autoBind, triggerEvent } from "utils";
import * as R from "ramda";
import React from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import TableListToolbar from "./TableListToolbar";

function withToolbarTableList(List, options = {}) {
  return class WithHeaderList extends React.Component {
    constructor(props) {
      super(props);
      autoBind(["sortBy"], this);
    }
    componentDidMount() {
      const { mode, directory, toggleLoader } = this.props;

      toggleLoader(true);
      triggerEvent("get-packages", {
        cmd: ["outdated", "list"],
        mode,
        directory
      });
    }
    render() {
      const { selected, ...rest } = this.props;
      const { title } = options;

      return (
        <Paper>
          <TableListToolbar numSelected={selected.length} />
          <List {...rest} />
        </Paper>
      );
    }
  };
}

const { bool, string, func, array, object, number } = PropTypes;

withToolbarTableList.propTypes = {
  loading: string,
  toggleLoader: func.isRequired,
  toggleMainLoader: func.isRequired,
  mode: string.isRequired,
  total: number,
  directory: string,
  packages: array.isRequired,
  setPackages: func.isRequired,
  setPackageActions: func.isRequired,
  setGlobalMode: func.isRequired,
  reload: func.isRequired
};

export default withToolbarTableList;
