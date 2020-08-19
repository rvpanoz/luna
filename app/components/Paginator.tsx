import React, { useState, useCallback, useEffect, useRef, SyntheticEvent } from 'react';

type PaginatorProps = {
  totalRecords: number,
  currentPage: number,
  pageLimit: number,
  pageNeighbours: number,
  setOffset: (value: number) => void,
  setCurrentPage: (pageNo: number) => void
};

type LinkProps = {
  page: number,
  currentPage: number,
  onClick: (page: number, evt: SyntheticEvent) => void,
}

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const pool = [];

  while (i <= to) {
    pool.push(i);
    i += step;
  }

  return pool;
};

const Link = (props: LinkProps) => {
  const { page, currentPage, onClick } = props;

  return (
    <li>
      <a href="#" onClick={evt => onClick(page, evt)} className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-200 text-gray-600 ${page === currentPage + 1 ? 'bg-gray-200 ' : null}`}>
        {page}
      </a>
    </li>
  )
}

const Paginator = (props: PaginatorProps) => {
  const init = () => {
    const { totalRecords = null, pageLimit = 12, pageNeighbours = 0 } = props;

    const newPageLimit = typeof pageLimit === 'number' ? pageLimit : 12;
    const newTotalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
    const newPageNeighbours =
      typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    const totalPages = Math.ceil(newTotalRecords / newPageLimit);

    return {
      pageLimit: newPageLimit,
      totalRecords: newTotalRecords,
      pageNeighbours: newPageNeighbours,
      totalPages,
    };
  };

  const [state, setState] = useState(() => init());
  const firstRun = useRef(true);

  const gotoPage = useCallback(
    (page) => {
      const currentPage = Math.max(1, Math.min(page, state.totalPages));
      props.setCurrentPage(currentPage - 1);
    },
    [state.totalPages, props.pageLimit]
  );

  useEffect(() => {
    gotoPage(1);
  }, [gotoPage]);

  useEffect(() => {
    props.setOffset((props.currentPage - 1) * props.pageLimit);
  }, [props.currentPage]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const totalRecords = props.totalRecords;
    const totalPages = Math.ceil(totalRecords / state.pageLimit);

    setState({ ...state, totalRecords: props.totalRecords, totalPages });
  }, [props.totalRecords]);

  const handleClick = (page: number, evt: SyntheticEvent) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const fetchPageNumbers = useCallback(() => {
    const totalPages = state.totalPages;
    const currentPage = props.currentPage;
    const pageNeighbours = state.pageNeighbours; //Pages between first and middle block

    const totalNumbers = state.pageNeighbours * 2 + 3; //Neigbours on both sides including first, middle and last
    const totalBlocks = totalNumbers + 2; //including left and right buttons

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }, [state.totalPages, props.currentPage, state.pageNeighbours]);

  if (!state.totalRecords) {
    return null;
  }

  if (state.totalPages === 1) {
    return null;
  }

  const { currentPage } = props;
  const pages = fetchPageNumbers();

  return (
    <div className="mt-4">
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          {pages.map((page) => {
            console.log(page, typeof page);

            return <Link key={`page-${page}`} page={page} onClick={handleClick} currentPage={currentPage} />;
          })}
        </ul>
      </nav>
    </div>);
}

export default Paginator;
