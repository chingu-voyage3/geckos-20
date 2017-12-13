import React, { Component } from 'react';
import BoardColumn from './Column';

export default class Board extends Component {
  render() {
    return (
      <div className="board">
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
      </div>
    );
  }
}
