/* eslint-disable import/no-named-as-default */
import React from 'react';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import Board from '../components/Board';
import dataModel from '../fixtures/dataModel';
import database from '../firebase/firebase';
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

  componentDidMount = () => {
    this.props.fetchCards();
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

  // <button onClick={BoardContainer.dbPush}>Add data</button>
  render() {
    return (
      <div>
        <Board
          cards={this.props.cards}
          cardCallbacks={{
            updateStatus: this.updateCardStatus,
            updatePosition: this.updateCardPosition,
            persistCardDrag: this.persistCardDrag
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
