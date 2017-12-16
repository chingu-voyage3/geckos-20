import React from 'react';
import Board from '../components/Board';
import dataModel from '../fixtures/dataModel';
import database from '../firebase/firebase';

export default class BoardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  render() {
    return (
      <div>
        <Board
          cards={this.state.cards.length > 1 ? this.state.cards : dataModel}
        />
      </div>
    );
  }
}
