import React, { Component } from 'react'
import Pagination from '../pagination/Pagination';
import './TableFooter.css';

export default class TableFooter extends Component {

  pageSwitcherRef = React.createRef();

  handlePageSizeChange = (e) => {
    const pageSize = +e.target.value;
    this.props.handlePageSizeChange(pageSize);
  }

  handlePageChange = (e) => {
    const { pages } = this.props;
    const pageNumber = +e.target.value - 1;
    if (pageNumber > 0 && pageNumber <= pages) {
      this.props.handlePageChange(pageNumber);
    } else if (pageNumber < 1) {
      this.props.handlePageChange(0);
    } else {
      this.props.handlePageChange(pages - 1);
    }
  }

  getPageSizeSwitcher() {
    return <select className="page-size-switcher d-none d-md-inline-block" onChange={this.handlePageSizeChange}>
      <option value="10">10 rows</option>
      <option value="25">25 rows</option>
      <option value="50">50 rows</option>
      <option value="100">100 rows</option>
    </select>
  }

  getMetaInfo() {
    const { page, totalRows, pageSize } = this.props;
    const startPage = page * pageSize + 1;
    let endPage = page * pageSize + pageSize;
    endPage = endPage > totalRows ? totalRows : endPage
    return <div className="d-none d-lg-inline-block meta-info">
      Showing {startPage} - {endPage} of {totalRows}
    </div>
  }

  getPageSwitcher() {
    const { totalRows, pages } = this.props;
    return <div className="page-switcher">
      Page <input ref={this.pageSwitcherRef} onBlur={this.handlePageChange} type="number" min="0" max={totalRows} />
      of {pages}
    </div>
  }

  componentDidUpdate() {
    this.pageSwitcherRef.current.value = this.props.page + 1;
  }

  render() {
    const { page, pages, handlePageChange } = this.props;
    return (
      <div className="table-footer clearfix">
        {this.getPageSwitcher()}
        {this.getPageSizeSwitcher()}
        {this.getMetaInfo()}
        <Pagination
          page={page}
          pages={pages}
          handlePageChange={handlePageChange}
        />
      </div>
    )
  }
}
