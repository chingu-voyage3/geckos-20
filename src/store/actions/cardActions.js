/* eslint-disable no-unused-vars */
import update from 'immutability-helper';
import database from '../../firebase/firebase';
import * as types from '../types';

const startCardsFetch = cards => ({
  type: types.FETCH_CARDS,
  cards
});

export const fetchCards = () => (dispatch) => {
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
      dispatch(startCardsFetch(cards));
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.warn('Error ocurred :( ', error);
    });
};

const startAddCard = cards => ({
  type: types.ADD_CARD,
  cards
});

export const addCard = newCard => (dispatch, getState) => {
  // Keep a reference to the original state prior to the mutations
  // in case we need to revert the optimistic changes in the UI
  const { cards } = getState();
  let card;

  // Add a temporary ID to the card
  if (newCard.id === null) {
    card = Object.assign({}, card);
    console.log(card);
  } else {
    card = { ...newCard };
  }
  // Create a new object and push the new card to the array of cards
  const updatedCards = [...cards.cards, card];

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
      dispatch(startAddCard(updatedCards));
    })
    .catch((err) => {
      console.log(err);
      dispatch(startAddCard(cards.cards));
    });
};

const startUpdateCard = cards => ({
  type: types.UPDATE_CARD,
  cards
});

export const updateCard = card => (dispatch, getState) => {
  const cardId = card.id;
  // Keep a reference to the original state prior to the mutations
  // in case we need to revert the optimistic changes in the UI
  const { cards } = getState().cards;
  // Find the index of the card
  const cardIndex = cards.findIndex(c => c.id === cardId);
  // Using the $set command, we will change the whole card
  const updatedCards = update(cards, {
    [cardIndex]: { $set: card }
  });
  // set the component state to the mutated object
  // this.setState({ cards: nextState });
  console.log(card);
  // Call the API to update the card on the server
  database
    .ref(`cards/${cardId}/`)
    .update(card)
    .then(() => {
      console.log('card updated');
      dispatch(startUpdateCard(updatedCards));
    })
    .catch((error) => {
      console.error('DB error:', error);
      dispatch(startUpdateCard(cards));
    });
};

const startRemoveCard = cards => ({
  type: types.REMOVE_CARD,
  cards
});

export const removeCard = cardId => (dispatch, getState) => {
  const { cards } = getState().cards;
  const updatedCards = cards.filter(({ id }) => id !== cardId);

  return database
    .ref(`cards/${cardId}/`)
    .remove()
    .then(() => {
      dispatch(startRemoveCard(updatedCards));
    })
    .catch((err) => {
      console.log(err);
    });
};
