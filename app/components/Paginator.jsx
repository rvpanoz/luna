import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  SyntheticEvent,
} from 'react';
import { number, func } from 'prop-types';

const Link = (props) => {
  const { page, currentPage, onClick } = props;

  return (
    <li>
      <a
        href="#"
        onClick={(evt) => onClick(page, evt)}
        className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-200 text-gray-600 ${
          page === currentPage + 1 ? 'bg-gray-200 ' : null
        }`}
      >
        {page}
      </a>
    </li>
  );
};

Link.propTypes = {
  page: number,
  currentPage: number,
  onClick: func,
};

const Paginator = (props) => {
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
  }, [props.totalRecords, state.pageLimit]);

  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  if (!state.totalRecords) {
    return null;
  }

  if (state.totalPages === 1) {
    return null;
  }

  const { currentPage } = props;

  return (
    <div className="mt-4">
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          {Array.from(Array(state.totalPages), (_, i) => i + 1).map((page) => {
            return (
              <Link
                key={`page-${page}`}
                page={page}
                onClick={handleClick}
                currentPage={currentPage}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

Paginator.propTypes = {
  totalRecords: number,
  currentPage: number,
  pageLimit: number,
  pageNeighbours: number,
  setOffset: func,
  setCurrentPage: func,
};

export default Paginator;
