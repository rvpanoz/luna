/* eslint-disable react/require-default-props */

import React from 'react';
import { number, func } from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const Pagination = props => {
  const {
    rowCount,
    handleChangePage,
    handleChangePageRows,
    page,
    rowsPerPage
  } = props;

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          colSpan={6}
          count={rowCount}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
          page={page || 0}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangePageRows}
        />
      </TableRow>
    </TableFooter>
  );
};

Pagination.propTypes = {
  rowCount: number,
  handleChangePage: func,
  handleChangePageRows: func,
  page: number,
  rowsPerPage: number
};

export default Pagination;
