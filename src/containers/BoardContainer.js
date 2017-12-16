import React from 'react';
import Board from '../components/Board';

export default class BoardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }
  render() {
    return <Board cards={this.state.cards} />;
  }
}
