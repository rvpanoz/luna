/**
 * TableList component
 **/

import { APP_MODES, PACKAGE_GROUPS } from "constants/AppConstants";
import { autoBind, triggerEvent } from "utils";
import { withStyles } from "material-ui/styles";
import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from "material-ui/Table";
import Avatar from "material-ui/Avatar";
import Checkbox from "material-ui/Checkbox";
import TableListHeader from "./TableListHeader";
import Tooltip from "material-ui/Tooltip";
import {
  infoColor,
  primaryColor,
  grayColor,
  dangerColor
} from "styles/variables";
import {
  Reorder as ReorderIcon,
  Code as CodeIcon,
  Build as BuildIcon,
  List as ListIcon
} from "material-ui-icons";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: 15
  },
  tableWrapper: {
    overflowX: "auto"
  },
  infoTableHeader: {
    color: infoColor
  },
  avatar: {
    margin: 0,
    color: "#fff",
    fontSize: 10
  },
  gloAvatar: {
    backgroundColor: grayColor
  },
  depAvatar: {
    backgroundColor: theme.palette.primary.light
  },
  devAvatar: {
    backgroundColor: theme.palette.secondary.dark
  },
  optAvatar: {
    backgroundColor: primaryColor
  },
  tableRow: {
    border: "none",
    padding: theme.spacing.unit,
    lineHeight: "1.4",
    verticalAlign: "middle",
    "&:hover": {
      color: infoColor,
      cursor: "pointer",
      background: theme.palette.info.light
    }
  },
  tablelist: {
    visibility: "visible",
    overflowX: "hidden",
    overflowY: "auto",
    clear: "both",
    maxHeight: 850
  },
  table: {
    marginBottom: 0,
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: 0,
    borderCollapse: "collapse"
  },
  tableCell: {
    fontSize: 14,
    lineHeight: "1.4em",
    padding: "12px 8px",
    verticalAlign: "middle"
  }
});

class TableList extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(
      [
        "handleChangePage",
        "handleChangeRowsPerPage",
        "viewPackage",
        "handleClick"
      ],
      this
    );
  }
  handleChangePage(e, page) {
    const { setPage } = this.props;
    setPage(page);
  }
  handleChangeRowsPerPage(e) {
    const { setRowsPerPage } = this.props;
    setRowsPerPage(e.target.value);
  }
  handleClick(e, name) {
    e.preventDefault();
    const { selected, setSelectedPackage } = this.props;
    setSelectedPackage(name);
    e.stopPropagation();
  }
  viewPackage(e, name, version, mode, directory, repo, latest) {
    const { toggleMainLoader } = this.props;

    if (e) {
      e.preventDefault();
    }

    toggleMainLoader(true);
    triggerEvent("view-package", {
      cmd: ["view"],
      pkgName: name,
      pkgVersion: version,
      latest,
      repo,
      mode,
      directory
    });

    return false;
  }
  applyFilters(packages, filters) {
    const groups = Object.keys(PACKAGE_GROUPS);
    let filtered;

    filters.forEach(filterName => {
      let prop;
      if (groups.indexOf(filterName) > -1) {
        prop = "_group";
      }

      filtered =
        packages &&
        packages.filter(pkg => {
          if (prop) {
            return pkg[prop] === filterName;
          }
          return !!pkg[filterName];
        });
    });

    return filtered;
  }
  render() {
    const {
      classes,
      order,
      orderBy,
      rowCount,
      selected,
      packages,
      page,
      handleSort,
      rowsPerPage,
      isSelected,
      handleSelectAllClick,
      mode,
      directory,
      loading,
      update,
      filters
    } = this.props;

    if (loading) {
      return null;
    }

    const listPackages =
      filters && filters.length
        ? this.applyFilters(packages, filters)
        : packages;

    const numSelected =
      selected && Array.isArray(selected) ? selected.length : 0;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, listPackages.length - page * rowsPerPage);

    return (
      <section className={classes.root}>
        <Table className={classes.tableResponsive}>
          <TableListHeader
            order={order}
            orderBy={orderBy}
            rowCount={rowCount}
            numSelected={numSelected}
            onRequestSort={handleSort}
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {listPackages
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pkg, idx) => {
                if (!pkg) {
                  return null;
                }

                const {
                  missing,
                  peerMissing,
                  latest,
                  license,
                  description,
                  deprecated,
                  version,
                  name,
                  repository,
                  _group
                } = pkg;

                const alreadySelected = isSelected(name);

                return (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    role="checkbox"
                    onClick={e => {
                      const _version = version.replace(/\^/g, "");
                      this.viewPackage(
                        e,
                        name,
                        _version,
                        mode,
                        directory,
                        repository,
                        latest
                      );
                    }}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={`pkgrow-${idx}`}
                    selected={alreadySelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={e => this.handleClick(e, name)}
                        checked={alreadySelected}
                      />
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      <span
                        style={{
                          display: "inline-flex",
                          overflowWrap: "break-word"
                        }}
                      >
                        {name}
                      </span>
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {version}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {latest ? (
                        <span
                          style={{
                            color: "red"
                          }}
                        >
                          {latest}
                        </span>
                      ) : (
                        version
                      )}
                    </TableCell>
                    <TableCell padding="none" className={classes.tableCell}>
                      {_group === null && (
                        <Tooltip
                          enterDelay={300}
                          leaveDelay={300}
                          placement="top"
                          title="global package"
                        >
                          <Avatar
                            className={cn(classes.avatar, classes.gloAvatar)}
                          >
                            <ListIcon variant="mini" />
                          </Avatar>
                        </Tooltip>
                      )}
                      {_group === "dependencies" && (
                        <Tooltip
                          enterDelay={300}
                          leaveDelay={300}
                          placement="top"
                          title="Dependency"
                        >
                          <Avatar
                            className={cn(classes.avatar, classes.depAvatar)}
                          >
                            <CodeIcon />
                          </Avatar>
                        </Tooltip>
                      )}
                      {_group === "devDependencies" && (
                        <Tooltip
                          enterDelay={300}
                          leaveDelay={300}
                          placement="top"
                          title="Dev Dependency"
                        >
                          <Avatar
                            className={cn(classes.avatar, classes.devAvatar)}
                          >
                            <BuildIcon />
                          </Avatar>
                        </Tooltip>
                      )}
                      {_group === "optionalDependencies" && (
                        <Tooltip
                          enterDelay={300}
                          leaveDelay={300}
                          placement="top"
                          title="Optional Dependency"
                        >
                          <Avatar
                            className={cn(classes.avatar, classes.optAvatar)}
                          >
                            <ReorderIcon />
                          </Avatar>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={6}
                count={rowCount}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                page={page}
                backIconButtonProps={{
                  "aria-label": "Previous Page"
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page"
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    );
  }
}

TableList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableList);
