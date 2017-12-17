import React from 'react';
import uuid from 'uuid/v4';
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
        // console.log(childSnapshot.val());
        let taskArr;
        if (childSnapshot.val().tasks) {
          // Take Object of tasks and spread it to array for each card so it can be mapped and filtered
          taskArr = Object.keys(childSnapshot.val().tasks).map(key => ({
            ...childSnapshot.val().tasks[key],
          }));
        }
        // console.log(taskArr);
        cards.push({
          ...childSnapshot.val(),
          tasks: taskArr,
          id: childSnapshot.key,
        });
      });
      console.log(cards);
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

  deleteTask = (cardId, taskId) => {
    const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    // Create a new object without the task
    const cards = { ...this.state.cards };
    cards[cardIndex].tasks.filter(task => task !== taskId);
    this.setState(cards);

    // database
    //   .ref(`cards/${cardId}/tasks/${taskId}`)
    //   .remove()
    //   .then(() => {
    //     // File deleted successfully
    //     console.log('task removed');
    //   })
    //   .catch((error) => {
    //     // Uh-oh, an error occurred!
    //     console.log('Error ocurred :(');
    //   });
  };

  toggleTask = (cardId, taskId, taskIndex) => {
    console.log('toggle task');
  };

  render() {
    console.log(this.state);
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
