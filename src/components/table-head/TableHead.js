import React, { Component } from 'react'
import './TableHead.css';

const ASC = 'SORT_ORDER_ASC';
const DESC = 'SORT_ORDER_DESC';

export default class TableHead extends Component {

  state = {
    sortBy: null,
    order: null
  }

  handleSortChange = (e) => {
    const el = e.target;
    const { sortBy, order } = this.state;
    const accessor = el.getAttribute('data-sort-by');
    let newOrder = ASC;
    if (sortBy === accessor) {
      newOrder = order === ASC ? DESC : ASC;
    }
    this.setState({
      sortBy: accessor,
      order: newOrder
    }, () => {
      const { sortBy, order } = this.state;
      this.props.onSortChange({ sortBy, order });
    });
  }

  getHeaders() {
    const { sortBy, order } = this.state;
    const { columns } = this.props;
    return columns.map(column => {
      return <th style={column.width ? { width: column.width } : {}} key={column.header} > {column.header}
        <span onClick={this.handleSortChange} data-sort-by={column.accessor} className={sortBy !== column.accessor && column.sortable ? 'sorting' : ''}></span>
        <span onClick={this.handleSortChange} data-sort-by={column.accessor} className={sortBy === column.accessor && column.sortable && order === ASC ? 'sorting-asc' : ''}></span>
        <span onClick={this.handleSortChange} data-sort-by={column.accessor} className={sortBy === column.accessor && column.sortable && order === DESC ? 'sorting-desc' : ''}></span>
      </th >;
    });
  }

  render() {
    return (
      <thead>
        <tr>
          {this.getHeaders()}
        </tr>
      </thead>
    )
  }
}
