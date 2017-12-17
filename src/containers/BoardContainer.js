import React from 'react';
import uuid from 'uuid/v4';
import moment from 'moment';
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
    const cardsRef = database.ref('cards');
    cardsRef.once('value').then((snapshot) => {
      const cards = [];
      snapshot.forEach((childSnapshot) => {
        cards.push({
          ...childSnapshot.val(),
          id: childSnapshot.key,
        });
      });
      this.setState(() => ({ cards }));
    });
  };

  addTask = (cardId, taskName) => {
    const task = {
      id: uuid(),
      name: taskName,
      done: false,
      createdAt: Date.now(),
    };
    return database
      .ref(`cards/${cardId}/tasks/${task.id}`)
      .set(task)
      .then(() => this.dbFetch());
  };

  deleteTask = (cardId, taskId, taskIndex) => {
    const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    // Create a new object without the task
    const cards = { ...this.state.cards };
    cards[cardIndex].tasks.splice(taskIndex, 1);
    console.log(taskIndex);
    this.setState(cards);

    database
      .ref(`cards/${cardId}/tasks/${taskId}`)
      .remove()
      .then(() => {
        // File deleted successfully
        console.log('task removed');
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log('Error ocurred :(');
      });
  };

  toggleTask = (cardId, taskId, taskIndex) => {
    console.log('toggle task');
  };

  render() {
    return (
      <div>
        <button onClick={BoardContainer.dbPush}>Add data</button>
        <Board
          cards={this.state.cards}
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
