/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import CardForm from './CardForm';
import uuid from 'uuid/v4';

class NewCard extends Component {
  static propTypes = {
    cardCallbacks: PropTypes.shape({
      updateStatus: PropTypes.func.isRequired,
      updatePosition: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    this.setState({
      id: uuid(),
      title: '',
      description: '',
      status: 'todo',
      color: '#c9c9c9',
      tasks: [],
    });
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.cardCallbacks.addCard(this.state);
    this.props.modalClose();
    // this.props.history.push('/dashboard');
  };
  handleClose = (e) => {
    this.props.modalClose();
  };

  render() {
    return (
      <CardForm
        draftCard={this.state}
        buttonLabel="Create Card"
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleClose={this.handleClose}
      />
    );
  }
}

export default withRouter(NewCard);
