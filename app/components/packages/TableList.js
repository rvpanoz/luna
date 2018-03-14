import { triggerEvent } from "utils";
import { withStyles } from "material-ui/styles";
import { tableListStyles } from "./styles";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Table from "material-ui/Table";
import TableListHeader from "./TableListHeader";

class TableList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { mode, directory } = this.props;

    toggleLoader(true);
    triggerEvent("get-packages", {
      cmd: ["outdated", "list"],
      mode,
      directory
    });
  }
  render() {
    const { classes, selected, orderBy, order, packages } = this.props;

    return (
      <Table className={classes.table}>
        <TableListHeader
          numSelected={(selected && selected.length) || 0}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={this.handleSelectAllClick}
          onRequestSort={this.handleRequestSort}
          rowCount={packages.length}
        />
        <TableBody />
        <TableFooter />
      </Table>
    );
  }
}

export default withStyles(tableListStyles)(TableList);
