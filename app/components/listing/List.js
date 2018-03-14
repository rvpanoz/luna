import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Paper from "material-ui/Paper";
import { triggerEvent } from "utils";
import { withStyles } from "material-ui/styles";
import { listStyles } from "./styles";
import Toolbar from "./Toolbar";

class EnchancedList extends React.Component {
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
    const { classes, selected, packages } = this.props;

    return (
      <Paper className={classes.root}>
        <Toolbar numSelected={selected} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead numSelected={selected.length} />
            <TableBody />
          </Table>
        </div>
      </Paper>
    );
  }
}

export default withStyles(listStyles)(EnchancedList);
