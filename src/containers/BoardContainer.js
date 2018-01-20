/* eslint-disable import/no-named-as-default */
import React from 'react';
import uuid from 'uuid/v4';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import Board from '../components/Board';
import dataModel from '../fixtures/dataModel';
import database from '../firebase/firebase';
import { toggleTask } from '../store/actions/taskActions';
import { fetchCards } from '../store/actions/cardActions';
import { throttle } from '../helpers';

class BoardContainer extends React.Component {
  static dbPush() {
    dataModel.forEach(data =>
      database
        .ref('cards')
        .push(data)
        .then(console.log('pushed?'))
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.warn('Error ocurred :( ', error);
        }));
  }
  // constructor() {
  //   super();
  //   this.state = {
  //     cards: []
  //     // isOpen: true
  //   };
  // }

  componentDidMount = () => {
    this.props.fetchCards();
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
              ...childSnapshot.val().tasks[key]
            }));
          }
          // console.log(taskArr);
          cards.push({
            ...childSnapshot.val(),
            tasks: taskArr,
            id: childSnapshot.key
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
      createdAt: Date.now()
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
    const cardIndex = this.props.cards.findIndex(card => card.id === cardId);
    // Create a new object without the task
    const cards = [...this.props.cards];
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
    const cardIndex = this.props.cards.findIndex(card => card.id === cardId);
    // Create a new object without the task
    const cards = [...this.props.cards];
    const task = cards[cardIndex].tasks.find(task => task.id === taskId);
    task.done = !taskStatus;
    this.setState(cards);
    // mirror changes to firebase
    database
      .ref(`cards/${cardId}/tasks/${taskId}`)
      .update({
        done: task.done
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

  updateCardStatus = throttle((cardId, listId) => {
    // Find the index of the card
    const cardIndex = this.props.cards.findIndex(card => card.id === cardId);
    // Get the current card
    const card = this.props.cards[cardIndex];
    // Only proceed if hovering over a different list
    if (card.status !== listId) {
      // set the component state to the mutated object
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: listId }
          }
        }
      }));
    }
  });

  updateCardPosition = throttle((cardId, afterId) => {
    // Only proceed if hovering over a different card
    if (cardId !== afterId) {
      // Find the index of the card
      const cardIndex = this.props.cards.findIndex(card => card.id === cardId);
      // Get the current card
      const card = this.props.cards[cardIndex];
      // Find the index of the card the user is hovering over
      const afterIndex = this.props.cards.findIndex(card => card.id === afterId);
      // Use splice to remove the card and reinsert it a the new index
      this.setState(update(this.state, {
        cards: {
          $splice: [[cardIndex, 1], [afterIndex, 0, card]]
        }
      }));
    }
  }, 500);

  persistCardDrag = (cardId, status) => {
    // Find the index of the card
    const cardIndex = this.props.cards.findIndex(card => card.id === cardId);
    const card = this.props.cards[cardIndex];
    console.log(status);
    database
      .ref(`cards/${cardId}/`)
      .update({
        status: card.status
      })
      .then(() => {
        // File updated successfully
        console.log('card status updated');
      })
      .catch((error) => {
        console.error('DB error:', error);
        this.setState(update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: status }
            }
          }
        }));
      });
  };

  addCard = (newCard) => {
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    const prevState = this.state;

    const cardId = uuid();
    let card;
    // Add a temporary ID to the card
    if (newCard.id === null) {
      card = Object.assign({}, card, { id: cardId });
      console.log(card);
    } else {
      card = { ...newCard };
    }
    // Create a new object and push the new card to the array of cards
    const nextState = update(this.props.cards, { $push: [card] });
    // set the component state to the mutated object
    this.setState({ cards: nextState });
    // Add card to firebase
    database
      .ref('cards')
      .push(card)
      .then((ref) => {
        console.log(ref.key);
        return ref.key;
      })
      .then((key) => {
        // When the server returns the definitive ID
        // used for the new Card on the server, update it on React
        card.id = key;
        this.setState({ cards: nextState });
      })
      .catch((error) => {
        this.setState(prevState);
      });
  };

  updateCard = (card) => {
    const cardId = card.id;
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    const prevState = this.state;
    // Find the index of the card
    const cardIndex = this.props.cards.findIndex(c => c.id === card.id);
    // Using the $set command, we will change the whole card
    const nextState = update(this.props.cards, {
      [cardIndex]: { $set: card }
    });
    // set the component state to the mutated object
    this.setState({ cards: nextState });
    console.log(card);
    // Call the API to update the card on the server
    // database
    //   .ref(`cards/${cardId}/`)
    //   .update({
    //     card
    //   })
    //   .then(() => {
    //     console.log('card updated')
    //   })
    //   .catch((error) => {
    //     console.error('DB error:', error);
    //     this.setState(prevState);
    //   });
  };

  // <button onClick={BoardContainer.dbPush}>Add data</button>
  render() {
    return (
      <div>
        <Board
          cards={this.props.cards}
          taskCallbacks={{
            toggle: this.toggleTask,
            delete: this.deleteTask,
            add: this.addTask
          }}
          cardCallbacks={{
            updateStatus: this.updateCardStatus,
            updatePosition: this.updateCardPosition,
            persistCardDrag: this.persistCardDrag,
            addCard: this.addCard,
            updateCard: this.updateCard
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cards.cards
});

const mapDispatchToProps = dispatch => ({
  fetchCards: () => dispatch(fetchCards())
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
