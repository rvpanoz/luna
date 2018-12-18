/* eslint-disable */

/**
 * Table footer - pagination
 */

import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const Footer = props => {
  const {
    rowCount,
    handleChangePage,
    handleChangeRowsPerPage,
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
          rowsPerPageOptions={[10, 15, 20, 25, 50]}
          page={page || 0}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableRow>
    </TableFooter>
  );
};

export default Footer;
