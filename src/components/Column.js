import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColumnCard from './Card';

export default class BoardColumn extends Component {
  render() {
    const cards = this.props.cards.map(card => (
      <ColumnCard {...card} taskCallbacks={this.props.taskCallbacks} />
    ));
    return (
      <div className="column">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

BoardColumn.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.shape({
    toggle: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
  }).isRequired,
};
