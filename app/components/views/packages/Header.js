import React from "react";
import PropTypes from "prop-types";
import { useCallback, useRef } from "react";
import { useDispatch } from "redux-react-hook";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { addSelected } from "models/ui/actions";

const columnData = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "version", disablePadding: true, label: "Installed" },
  { id: "latest", disablePadding: true, label: "Latest" },
  { id: "Status", disablePadding: true, label: "Status" }
];

const TableHeader = ({ numSelected, rowCount, packages, sortBy, sortDir }) => {
  const dispatch = useDispatch();
  const checkboxAll = useRef(null);

  const handleSelectAll = useCallback(e => {
    if (e.target.checked && packages) {
      packages.forEach(name =>
        dispatch(
          addSelected({
            name,
            force: true
          })
        )
      );
    }

  }, [dispatch, packages]);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onClick={handleSelectAll}
            inputProps={{
              ref: checkboxAll
            }}
          />
        </TableCell>
        {columnData.map(column => <TableCell
          key={column.id}
          padding={column.disablePadding ? "none" : "default"}
          sortDirection={sortBy === column.id ? sortDir : false}
          style={column.id !== "name" ? { textAlign: "center" } : {}}
        >
          {column.label}
        </TableCell>)}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  packages: PropTypes.arrayOf(PropTypes.string),
  sortBy: PropTypes.string,
  sortDir: PropTypes.string
};

export default TableHeader;
