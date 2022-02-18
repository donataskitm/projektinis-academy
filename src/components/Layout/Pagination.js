import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import ProptTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import {Link} from 'react-scroll';

const Pagination = props => {

  const TWO_PAGINATION_RANGE_SIZE = 2;
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < TWO_PAGINATION_RANGE_SIZE) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    if(!(lastPage===currentPage)){
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if(!(currentPage===1)){
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination d-flex flex-wrap align-items-center justify-content-center">
      <li >
        <Button onClick={onPrevious} variant="success">
             Atgal
        </Button>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index}>&#8230;</li>;
        }

        return (
          <li key={index}
            className="m-1 page-item"
          >
            <Link activeClass="active" to="scroll-point" spy={true}>
              <Button
                variant={pageNumber === currentPage?"secondary":"success"}
                onClick={() => onPageChange(pageNumber)}
                className={pageNumber === currentPage?"active outline-dark":"shadow-none"}> 
                {pageNumber}
              </Button>
            </Link>
          </li>
        );
      })}
      <li>
        <Button onClick={onNext} variant="success">
              Pirmyn
        </Button>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  onPageChange: ProptTypes.func,
  totalCount: ProptTypes.number,
  siblingCount: ProptTypes.number,
  currentPage: ProptTypes.number,
  pageSize: ProptTypes.number,
};

Pagination.defaultProps = {
  onPageChange: () => {},
  siblingCount: undefined,
  currentPage: undefined,
  pageSize: undefined,
  totalCount: undefined
};


export default Pagination;