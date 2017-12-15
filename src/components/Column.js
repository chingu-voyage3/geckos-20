import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColumnCard from './Card';

export default class BoardColumn extends Component {
  render() {
    const cards = this.props.cards.map(card => (
      <ColumnCard
        id={card.id}
        title={card.title}
        color={card.color}
        description={card.description}
        tasks={card.tasks}
        key={card.id}
      />
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
};
