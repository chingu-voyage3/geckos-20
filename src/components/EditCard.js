import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CardForm from './CardForm';
import { updateCard, removeCard } from '../store/actions/cardActions';

export class EditCard extends Component {
  handleSubmit = (e, updatedCard) => {
    e.preventDefault();
    this.props.updateCard(updatedCard);
    this.props.history.push('/dashboard');
  };

  handleClose = (e) => {
    this.props.history.push(null, '/dashboard');
  };

  render() {
    const {
      id, title, description, status, color, tasks
    } = this.props.card;
    const draftCard = {
      id,
      title,
      description,
      status,
      color,
      tasks
    };
    return (
      <CardForm
        draftCard={draftCard}
        buttonLabel="Edit Card"
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
        removeCard={this.props.removeCard}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCard: card => dispatch(updateCard(card)),
  removeCard: id => dispatch(removeCard(id))
});

export default connect(null, mapDispatchToProps)(withRouter(EditCard));
