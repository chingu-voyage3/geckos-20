import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dataModel from '../fixtures/dataModel';
import Column from './Column';

export default class Board extends Component {
  render() {
    return (
      <div className="board">
        <Column
          id="todo"
          title="To Do"
          taskCallbacks={this.props.taskCallbacks}
          cards={this.props.cards.filter(card => card.status === 'todo')}
        />
        <Column
          id="in-progress"
          title="In Progress"
          taskCallbacks={this.props.taskCallbacks}
          cards={this.props.cards.filter(card => card.status === 'in-progress')}
        />
        <Column
          id="done"
          title="Done"
          taskCallbacks={this.props.taskCallbacks}
          cards={this.props.cards.filter(card => card.status === 'done')}
        />
      </div>
    );
  }
}
Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.shape({
    toggle: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
  }).isRequired,
};

Board.defaultProps = {
  cards: dataModel,
};
