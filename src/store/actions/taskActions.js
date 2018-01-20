/* eslint-disable no-unused-vars */
import uuid from 'uuid/v4';
import * as types from '../types';
import database from '../../firebase/firebase';
import { fetchCards } from './cardActions';

const startToggleTask = cards => ({
  type: types.TOGGLE_TASK,
  cards
});

export const toggleTask = (cardId, taskId, taskStatus) => (
  dispatch,
  getState
) => {
  const prevState = getState().cards;
  const cards = [...prevState.cards];
  const cardIndex = cards.findIndex(card => card.id === cardId);
  // Create a new object without the task
  const toggledTask = cards[cardIndex].tasks.find(task => task.id === taskId);
  toggledTask.done = !taskStatus;
  dispatch(startToggleTask(cards));
  // mirror changes to firebase
  database
    .ref(`cards/${cardId}/tasks/${taskId}`)
    .update({
      done: toggledTask.done
    })
    .then(() => {
      // File updated successfully
      console.log('task status updated');
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.warn('Error ocurred :( ', error);
      // this.setState(prevState);
    });
};

const startDeleteTask = cards => ({
  type: types.DELETE_TASK,
  cards
});

export const deleteTask = (cardId, taskId) => (dispatch, getState) => {
  const prevState = getState().cards;
  const cards = [...prevState.cards];
  const cardIndex = cards.findIndex(card => card.id === cardId);
  // Create a new object without the task
  // Return new array with all values that passed filter test for task.id value
  const newTasks = cards[cardIndex].tasks.filter(task => task.id !== taskId);
  // append modified tasks arr to card
  cards[cardIndex].tasks = newTasks;

  dispatch(startDeleteTask(cards));

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
      // this.setState(prevState);
    });
};

const startAddTask = cards => ({
  type: types.ADD_TASK,
  cards
});

export const addTask = (cardId, taskName) => (dispatch, getState) => {
  const task = {
    id: uuid(),
    name: taskName,
    done: false,
    createdAt: Date.now()
  };

  const prevState = getState().cards;
  const cards = [...prevState.cards];
  const cardIndex = cards.findIndex(card => card.id === cardId);
  const updatedTasks = [...cards[cardIndex].tasks, task];
  cards[cardIndex].tasks = updatedTasks;

  dispatch(startAddTask(cards));

  return database
    .ref(`cards/${cardId}/tasks/${task.id}`)
    .set(task)
    .then(() => console.log('db tasks updated'))
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.warn('Error ocurred :( ', error);
      // Keep a reference to the original state prior to the mutations
      // in case you need to revert the optimistic changes in the UI
      // this.setState(prevState);
    });
};
