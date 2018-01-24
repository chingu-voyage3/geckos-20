/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import CardForm from './CardForm';
import { addCard } from '../store/actions/cardActions';

class NewCard extends Component {
  handleSubmit = (e, newCard) => {
    e.preventDefault();
    this.props.addCard(newCard);
    this.props.modalClose();
    // this.props.history.push('/dashboard');
  };

  handleClose = (e) => {
    this.props.modalClose();
  };

  render() {
    return (
      <CardForm
        draftCard={{}}
        buttonLabel="Create Card"
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCard: card => dispatch(addCard(card))
});

export default connect(null, mapDispatchToProps)(withRouter(NewCard));
