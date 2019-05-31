import React, { Component } from 'react'
import './TableActions.css';

export default class TableActions extends Component {

  debounceSearch = (cb, interval) => {
    let timeout;
    return (e) => {
      e.persist();
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        cb.call(this, e);
      }, interval);
    }
  }

  handleSearchChange = (e) => {
    const searchText = e.target.value;
    this.props.onSearch(searchText);
  }

  debouncedSearch = this.debounceSearch(this.handleSearchChange, 350);

  getTableTitle() {
    return <div className="table-title">
      <span>{this.props.title}</span>
    </div>
  }

  getTableSearch() {
    return <div className="search-container">
      <input onChange={this.debouncedSearch} type="text" className="table-search form-control" placeholder="Search" />
      <div className="search-icon" />
    </div>
  }

  getActions() {
    const { actions } = this.props;
    return actions.map(action => {
      return <button key={action.name} onClick={action.onClick} className={`action-btn btn btn-sm ${action.className}`}>{action.name}</button>
    })
  }

  render() {
    return (
      <div className="table-actions clearfix">
        {this.getTableTitle()}
        {this.getTableSearch()}
        {this.getActions()}
      </div>
    )
  }
}
