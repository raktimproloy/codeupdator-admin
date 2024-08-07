import React from 'react';
import classnames from 'classnames';
import { usePagination } from '../../../hooks/usePagination';

type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange:any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 items in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <div className="card-inner">
      <ul className={classnames('pagination justify-content-center justify-content-md-start', { [className!]: className })}>
        <li
          className={classnames('page-item', { 'disabled': currentPage === 1 })}
          onClick={onPrevious}
        >
          <a className="page-link" aria-label="Previous" style={{cursor:"pointer"}}>
            <span aria-hidden="true">Prev</span>
          </a>
        </li>
        {paginationRange.map((pageNumber:number, index:number) => {
          if (typeof pageNumber === 'string') {
            return (
              <li key={index} className="page-item disabled">
                <span className="page-link">&#8230;</span>
              </li>
            );
          }
          return (
            <li
              key={index}
              className={classnames('page-item', { 'active': pageNumber === currentPage })}
              onClick={() => onPageChange(pageNumber)}
            >
              <a className="page-link" style={{cursor:"pointer"}}>{pageNumber}</a>
            </li>
          );
        })}
        <li
          className={classnames('page-item', { 'disabled': currentPage === lastPage })}
          onClick={onNext}
        >
          <a className="page-link" aria-label="Next" style={{cursor:"pointer"}}>
            <span aria-hidden="true">Next</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
