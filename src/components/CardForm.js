import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unused-state */
class CardForm extends Component {
  static propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    draftCard: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
      color: PropTypes.string
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  state = {
    id: this.props.draftCard.id || uuid(),
    title: this.props.draftCard.title || '',
    description: this.props.draftCard.description || '',
    status: this.props.draftCard.status || 'todo',
    color: this.props.draftCard.color || '#c9c9c9',
    tasks: this.props.draftCard.tasks || []
  };

  onChange = (field, e) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { id } = this.state;
    return (
      <div>
        <div className="card big">
          <form onSubmit={e => this.props.handleSubmit(e, this.state)}>
            <input
              type="text"
              value={this.state.title}
              onChange={e => this.onChange('title', e)}
              placeholder="Title"
              required
            />
            <textarea
              value={this.state.description}
              onChange={e => this.onChange('description', e)}
              placeholder="Description"
              required
            />
            <label htmlFor="status">
              Status
              <select
                id="status"
                value={this.state.status}
                onChange={e => this.onChange('status', e)}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>
            <br />
            <label htmlFor="color">
              Color
              <input
                id="color"
                value={this.state.color}
                onChange={e => this.onChange('color', e)}
                type="color"
              />
            </label>
            <div className="actions">
              <button className="btn btn--edit" type="submit">
                {this.props.buttonLabel}
              </button>
              {this.props.removeCard ? (
                <button
                  className="btn btn--remove"
                  onClick={() => this.props.removeCard(id)}
                >
                  Remove Card
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CardForm;
