import React from "react";
import PropTypes from "prop-types";
import { and } from "ramda";

import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const columnData = [
    { id: "message", numeric: false, disablePadding: true, label: "Message" },
    { id: "required", disablePadding: true, label: "Required" },
    { id: "requiredBy", disablePadding: true, label: "Required by" },
];

const TableHeader = ({ selected, sortBy, sortDir }) => <TableHead>
    <TableRow>
        <TableCell padding="checkbox">
            <Checkbox
                indeterminate={selected > 0}
            />
        </TableCell>
        {columnData.map(column => {
            const needSort =
                and(!!sortBy, !!column.id) && and(true, sortBy === column.id);

            return (
                <TableCell
                    key={column.id}
                    padding={column.disablePadding ? "none" : "default"}
                    sortDirection={sortBy === column.id ? sortDir : false}
                >
                    {needSort ? (
                        <TableSortLabel
                            active={sortBy === column.id}
                            direction={sortDir}
                        >
                            {column.label}
                        </TableSortLabel>
                    ) : (
                            column.label
                        )}
                </TableCell>
            );
        })}
    </TableRow>
</TableHead>

TableHeader.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.string),
    sortBy: PropTypes.string,
    sortDir: PropTypes.string
}

export default TableHeader;
