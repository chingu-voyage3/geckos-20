import React, { Component } from 'react';
import ColumnCard from './Card';

export default class BoardColumn extends Component {
  render() {
    return (
      <div className="board__column">
        <ColumnCard />
      </div>
    );
  }
}
