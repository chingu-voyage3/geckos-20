import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Modal from 'react-modal';
import dataModel from '../fixtures/dataModel';
import Column from './Column';
import NewCard from './NewCard';

export class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  handleModalOpen = () => {
    this.setState(() => ({
      isOpen: true
    }));
  };
  handleModalClose = () => {
    this.setState(() => ({ isOpen: false }));
  };

  render() {
    return (
      <div className="board">
        <button className="float-button" onClick={this.handleModalOpen}>
          +
        </button>
        <Column
          id="todo"
          title="To Do"
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          cards={this.props.cards.filter(card => card.status === 'todo')}
        />
        <Column
          id="in-progress"
          title="In Progress"
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          cards={this.props.cards.filter(card => card.status === 'in-progress')}
        />
        <Column
          id="done"
          title="Done"
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          cards={this.props.cards.filter(card => card.status === 'done')}
        />
        <Modal
          isOpen={!!this.state.isOpen}
          onRequestClose={this.handleModalClose}
          contentLabel="Add task"
          closeTimeoutMS={200}
          className="overlay"
          ariaHideApp={false}
        >
          <NewCard
            cardCallbacks={this.props.cardCallbacks}
            modalClose={this.handleModalClose}
          />
          <button className="button" onClick={this.handleModalClose}>
            &times;
          </button>
        </Modal>
      </div>
    );
  }
}
Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.shape({
    delete: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired
  }).isRequired,
  cardCallbacks: PropTypes.shape({
    updateStatus: PropTypes.func.isRequired,
    updatePosition: PropTypes.func.isRequired
  }).isRequired
};

Board.defaultProps = {
  cards: dataModel
};

export default DragDropContext(HTML5Backend)(Board);
