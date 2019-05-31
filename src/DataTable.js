import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './DataTable.css';
import TableActions from './components/table-actions/TableActions';
import TableHead from './components/table-head/TableHead';
import TableBody from './components/table-body/TableBody';
import TableFooter from './components/table-footer/TableFooter';

export default class DataTable extends Component {

  state = {
    page: 0,
    pageSize: 10,
    localData: [],
    pages: 0,
    totalRows: 0
  }

  constructor(props) {
    super(props);
    const { data, page, defaultPageSize } = props;
    this.state = {
      page: page,
      pageSize: defaultPageSize,
      localData: data
    };
  }

  componentDidUpdate(prevProps) {
    const { data, manual } = this.props;
    if (!manual && data !== prevProps.data) {
      this.setState({
        localData: data
      }, () => {
        this.updateLocalData();
      });
    }
  }

  handlePageSizeChange = (pageSize) => {
    const { manual } = this.props;
    this.setState({
      page: 0,
      pageSize: pageSize
    }, () => {
      if (manual) {
        const { onFetchData } = this.props;
        onFetchData(this.state);
      } else {
        this.updateLocalData();
      }
    });
  }

  handlePageChange = (pageNumber) => {
    const { manual } = this.props;
    this.setState({
      page: pageNumber
    }, () => {
      if (manual) {
        const { onFetchData } = this.props;
        onFetchData(this.state);
      } else {
        this.updateLocalData();
      }
    });
  }

  updateLocalData() {
    const { page, pageSize } = this.state;
    const { data } = this.props;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    this.setState({
      localData: data.slice(startIndex, endIndex),
      pages: Math.ceil(data.length / pageSize),
      totalRows: data.length
    });
  }

  render() {
    //add text-nowrap class to table for single line data
    const { columns, data, pages, className, manual, onCellClick, onRowClick, title, actions, onSearch, onSortChange } = this.props;
    const { localData, page, pageSize, pages: localPages, totalRows: localTotalRows } = this.state;
    return <>
      <TableActions
        title={title}
        actions={actions}
        onSearch={onSearch}
      />
      <table className={`table table-responsive ${className}`}>
        <TableHead
          columns={columns}
          onSortChange={onSortChange}
        />
        <TableBody
          columns={columns}
          data={manual ? data : localData}
          onCellClick={onCellClick}
          onRowClick={onRowClick}
        />
      </table>
      <TableFooter
        pages={manual ? pages : localPages}
        page={page}
        pageSize={pageSize}
        handlePageChange={this.handlePageChange}
        totalRows={manual ? totalRows : localTotalRows}
        handlePageSizeChange={this.handlePageSizeChange}
      />
    </>
  }
}
