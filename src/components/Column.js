import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import constants from '../constants';

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id);
  },
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

export class Column extends Component {
  render() {
    const { connectDropTarget } = this.props;
    const cards =
      this.props.cards.length > 0
        ? this.props.cards.map(card => (
          <Card
            key={card.id}
            {...card}
            taskCallbacks={this.props.taskCallbacks}
            cardCallbacks={this.props.cardCallbacks}
          />
        ))
        : null;
    return connectDropTarget(<div className="column">
      <h1>{this.props.title}</h1>
      {cards}
    </div>, );
  }
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  connectDropTarget: PropTypes.func.isRequired,
  cardCallbacks: PropTypes.shape({
    updateStatus: PropTypes.func.isRequired,
    updatePosition: PropTypes.func.isRequired,
  }).isRequired,
  taskCallbacks: PropTypes.shape({
    toggle: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
  }).isRequired,
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(Column);
