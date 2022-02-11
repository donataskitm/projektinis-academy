import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let postNo = 1; postNo <= Math.ceil(totalPosts / postsPerPage); postNo++) {
    pageNumbers.push(postNo);
  }

  return (
    <div className="pagination d-flex flex-wrap  align-items-center justify-content-center">
      {pageNumbers.map(number => (
        <li key={number} className="page-item  ">
          <Button
            variant="success"
            className="m-1"
            onClick={() => paginate(number)} >{number}</Button>
        </li>

      ))}
    </div>
  );
};

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;