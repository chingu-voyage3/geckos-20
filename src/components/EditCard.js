import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardForm from './CardForm';

export class EditCard extends Component {
  static propTypes = {
    cardCallbacks: PropTypes.shape({
      updateStatus: PropTypes.func.isRequired,
      updatePosition: PropTypes.func.isRequired,
    }).isRequired,
  };
  componentWillMount() {
    this.setState({
      id: this.props.card.id,
      title: this.props.card.title,
      description: this.props.card.description,
      status: this.props.card.status,
      color: this.props.card.color,
      tasks: this.props.card.tasks,
    });
  }
  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.cardCallbacks.updateCard(this.state);
    this.props.history.pushState(null, '/');
  };
  handleClose = (e) => {
    this.props.history.pushState(null, '/');
  };

  render() {
    return (
      <CardForm
        draftCard={this.props.card}
        buttonLabel="Edit Card"
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    );
  }
}

export default EditCard;
