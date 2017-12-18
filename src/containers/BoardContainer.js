import React from 'react';
import uuid from 'uuid/v4';
import Board from '../components/Board';
import dataModel from '../fixtures/dataModel';
import database from '../firebase/firebase';
import update from 'immutability-helper';

export default class BoardContainer extends React.Component {
  static dbPush() {
    dataModel.forEach(data =>
      database
        .ref('cards')
        .push(data)
        .then(console.log('pushed?'))
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.warn('Error ocurred :( ', error);
        }),);
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
    database
      .ref('cards')
      .once('value')
      .then((snapshot) => {
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
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.warn('Error ocurred :( ', error);
      });
  };

  addTask = (cardId, taskName) => {
    // Keep a reference to the original state prior to the mutations
    // in case you need to revert the optimistic changes in the UI
    const prevState = this.state;
    const task = {
      id: uuid(),
      name: taskName,
      done: false,
      createdAt: Date.now(),
    };
    return database
      .ref(`cards/${cardId}/tasks/${task.id}`)
      .set(task)
      .then(() => this.dbFetch())
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.warn('Error ocurred :( ', error);
        this.setState(prevState);
      });
  };

  deleteTask = (cardId, taskId) => {
    const prevState = this.state;
    const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    // Create a new object without the task
    const cards = [...this.state.cards];
    // Return new array with all values that passed filter test for task.id value
    const newTasks = cards[cardIndex].tasks.filter(task => task.id !== taskId);
    // append modified tasks arr to card
    cards[cardIndex].tasks = newTasks;

    this.setState(cards);

    // mirror changes to firebase
    database
      .ref(`cards/${cardId}/tasks/${taskId}`)
      .remove()
      .then(() => {
        // File deleted successfully
        console.log('task removed');
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.warn('Error ocurred :( ', error);
        this.setState(prevState);
      });
  };

  toggleTask = (cardId, taskId, taskStatus) => {
    const prevState = this.state;
    const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    // Create a new object without the task
    const cards = [...this.state.cards];
    const task = cards[cardIndex].tasks.find(task => task.id === taskId);
    task.done = !taskStatus;
    this.setState(cards);
    // mirror changes to firebase
    database
      .ref(`cards/${cardId}/tasks/${taskId}`)
      .update({
        done: task.done,
      })
      .then(() => {
        // File updated successfully
        console.log('task status updated');
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.warn('Error ocurred :( ', error);
        this.setState(prevState);
      });
  };

  updateCardStatus = (cardId, listId) => {
    // Find the index of the card
    const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    // Get the current card
    const card = this.state.cards[cardIndex];
    // Only proceed if hovering over a different list
    if (card.status !== listId) {
      // set the component state to the mutated object
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: listId },
          },
        },
      }),);
    }
  };

  updateCardPosition = (cardId, afterId) => {
    // Only proceed if hovering over a different card
    if (cardId !== afterId) {
    // Find the index of the card
      const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
      // Get the current card
      const card = this.state.cards[cardIndex];
      // Find the index of the card the user is hovering over
      const afterIndex = this.state.cards.findIndex(card => card.id === afterId);
      // Use splice to remove the card and reinsert it a the new index
      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }));
    }
  }
  render() {
    // console.log(this.state);
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
          cardCallbacks={{
            updateStatus: this.updateCardStatus,
            updatePosition: this.updateCardPosition,
          }}
        />
      </div>
    );
  }
}
