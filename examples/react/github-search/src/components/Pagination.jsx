import React from 'react';
import { connect } from 'react-redux';
import ReactPagination from 'react-paginate';
import { setPage } from '../actions';

const Pagination = ({ page, pageCount, setPage }) => (
  <div className="pagination-container">
    <ReactPagination
      breakLabel={<a>...</a>}
      forceSelected={page - 1}
      pageNum={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      clickCallback={event => {
        setPage(event.selected + 1);
        window.scrollTo(0, 0);
      }}
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
    />
  </div>
);


const mapStateToProps = ({ search: { pageCount, page } }) => ({ pageCount, page });
const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(setPage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
