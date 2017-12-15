import React, { Component } from 'react';
import ColumnCard from './Card';

export default class BoardColumn extends Component {
  render() {
    const cards = this.props.cards.map(card => (
      <ColumnCard
        id={card.id}
        title={card.title}
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
