import React, { Component } from 'react'
import './Pagination.css';

export default class Pagination extends Component {

  PAGES_TO_SHOW = 8;

  handlePreviousClick = () => {
    const { page, handlePageChange } = this.props;
    if (page > 0) {
      const newPage = page - 1;
      handlePageChange(newPage);
    }
  }

  handleNextClick = () => {
    const { page, pages, handlePageChange } = this.props;
    if (page < pages - 1) {
      const newPage = page + 1;
      handlePageChange(newPage);
    }
  }

  handlePageClick = (e) => {
    const el = e.target;
    const newPage = el.getAttribute('data-page');
    this.props.handlePageChange(+newPage);
  }

  getPageNumbers() {
    const pageNumbers = [];
    const { page, pages } = this.props;
    let endPage = page + Math.floor(this.PAGES_TO_SHOW / 2) + 1;
    endPage = endPage > pages ? pages : endPage;
    let startPage = endPage - this.PAGES_TO_SHOW;
    startPage = startPage > 0 ? startPage : 1;
    const numPages = endPage - startPage;
    if (numPages < this.PAGES_TO_SHOW) {
      endPage = endPage + this.PAGES_TO_SHOW - numPages;
      endPage = endPage > pages ? pages : endPage;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <div key={i} onClick={this.handlePageClick} data-page={i - 1} className={i === page+1 ? "page-num active d-none d-sm-inline-block" : "page-num d-none d-sm-inline-block"}>
          {i}
        </div>
      );
    }
    return pageNumbers;
  }

  render() {
    return (
      <div className="pagination">
        <div className="page-change-btn" onClick={this.handlePreviousClick}>
          &#60;
        </div>
        {this.getPageNumbers()}
        <div className="page-change-btn" onClick={this.handleNextClick}>
          &#62;
        </div>
      </div>
    );
  }
}
