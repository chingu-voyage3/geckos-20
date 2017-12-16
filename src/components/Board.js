import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dataModel from '../fixtures/dataModel';
import BoardColumn from './Column';

export default class Board extends Component {
  render() {
    return (
      <div className="board">
        <BoardColumn
          id="todo"
          title="To Do"
          cards={this.props.cards.filter(card => card.status === 'todo')}
        />
        <BoardColumn
          id="in-progress"
          title="In Progress"
          cards={this.props.cards.filter(card => card.status === 'in-progress')}
        />
        <BoardColumn
          id="done"
          title="Done"
          cards={this.props.cards.filter(card => card.status === 'done')}
        />
      </div>
    );
  }
}
Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
};

Board.defaultProps = {
  cards: dataModel,
};
