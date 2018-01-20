/* eslint-disable no-unused-vars */
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

export const updateCardStatus = (params) => {};

export const updateCardPosition = (params) => {};

export const persistCardDrag = (params) => {};

export const addCard = (params) => {};

export const updateCard = (params) => {};
