import React, { Component } from 'react'

export default class TableBody extends Component {

  handleCellClick = (e) => {
    const { onCellClick } = this.props;
    if (typeof onCellClick === 'function') {
      const el = e.target;
      const index = el.getAttribute('data-index');
      const accessor = el.getAttribute('data-accessor');
      const { data } = this.props;
      onCellClick({
        accessor: accessor,
        rowData: data[index],
        cellData: data[index][accessor]
      });
    }
  }

  handleRowClick = (e) => {
    const { onRowClick } = this.props;
    if (typeof onRowClick === 'function') {
      const el = e.target;
      const index = el.getAttribute('data-index');
      const { data } = this.props;
      onRowClick({
        index: index,
        data: data[index]
      });
    }
  }

  getRow(data) {
    const { columns } = this.props;
    return columns && columns.map((column, index) => {
      if (column.cell) {
        return <td data-index={index} data-accessor={column.accessor} onClick={this.handleCellClick} key={column.accessor}>
          {column.cell(data)}
        </td>;
      }
      return <td data-index={index} data-accessor={column.accessor} onClick={this.handleCellClick} key={column.accessor}>{data[column.accessor]}</td>;
    });
  }

  getBody() {
    const { data } = this.props;
    return data && data.map(row => {
      return <tr onClick={this.handleRowClick} key={row.id}>{this.getRow(row)}</tr>;
    });
  }

  render() {
    return (
      <tbody>
        {this.getBody()}
      </tbody>
    )
  }
}
