import React, { useState, useEffect } from 'react';

type PaginationProps = {
  totalRecords: number,
  currentPage: number,
  pageLimit: number,
  handleChangePage: (pageNo: number) => void
};

type LinkProps = {
  pageNo: number,
  currentPage: number,
  onClick: () => void,
}

const Link = (props: LinkProps) => {
  const { pageNo, currentPage, onClick } = props;

  return (
    <li>
      <a href="#" onClick={() => onClick()} className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-500 text-gray ${pageNo === currentPage + 1 ? 'bg-gray-600 text-white' : ''}`}>
        {pageNo}
      </a>
    </li>
  )
}

const Pagination = (props: PaginationProps) => {
  const { pageLimit, totalRecords, currentPage, handleChangePage } = props;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const totalPages = Math.ceil(totalRecords / pageLimit);
    setTotalPages(totalPages);
  }, []);

  return (
    <div className="mt-4">
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          {Array.from(Array(totalPages), (_, i) => i).map((pageNo) => <Link key={`page-${pageNo}`} currentPage={currentPage} pageNo={pageNo + 1} onClick={() => handleChangePage(pageNo)} />)}
        </ul>
      </nav>
    </div>
  )
}

export default Pagination;
