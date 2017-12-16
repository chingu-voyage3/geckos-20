import React from 'react';
import Board from '../components/Board';
import dataModel from '../fixtures/dataModel';
import database from '../firebase/firebase';

export default class BoardContainer extends React.Component {
  static dbPush() {
    dataModel.forEach(data =>
      database
        .ref('cards')
        .push(data)
        .then(console.log('pushed?')), );
  }
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  componentDidMount = () => {
    this.dbFetch();
  };

  dbFetch = () => {
    const cardsRef = database
      .ref('cards')
      .orderByKey()
      .limitToLast(100);
    cardsRef.once('value').then((snapshot) => {
      const cards = [];
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val());
        cards.push({
          ...childSnapshot.val(),
          id: childSnapshot.key,
        });
      });
      this.setState(() => ({ cards }));
    });
  };

  addTask = (cardId, taskName) => {
    console.log('add Task');
  };
  deleteTask = (cardId, taskId, taskIndex) => {
    console.log('delete task');
  };
  toggleTask = (cardId, taskId, taskIndex) => {
    console.log('toggle task');
  };

  render() {
    console.log(this.state.cards);
    return (
      <div>
        <button onClick={BoardContainer.dbPush}>Add data</button>
        <Board
          cards={this.state.cards.length > 1 ? this.state.cards : dataModel}
          taskCallbacks={{
            toggle: this.toggleTask,
            delete: this.deleteTask,
            add: this.addTask,
          }}
        />
      </div>
    );
  }
}
