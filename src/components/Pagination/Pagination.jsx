import React from 'react';
import './Pagination.scss';
import ReactPaginate from 'react-paginate';

export default function Pagination({
  pageCount,
  actionOnPageChange,
}) {
  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={<i className="fas fa-angle-left" />}
        nextLabel={<i className="fas fa-angle-right" />}
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        containerClassName="pagination"
        activeClassName="active"
        onPageChange={actionOnPageChange}
      />
    </div>
  );
}
