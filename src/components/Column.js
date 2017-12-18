import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default class Column extends Component {
  render() {
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
    return (
      <div className="column">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
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
