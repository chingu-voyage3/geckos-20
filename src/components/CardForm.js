import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable jsx-a11y/no-static-element-interactions */
export class CardForm extends Component {
  static propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    draftCard: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
      color: PropTypes.string,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  handleChange = (field, e) => {
    this.props.handleChange(field, e.target.value);
  };

  render() {
    return (
      <div>
        <div className="card big">
          <form onSubmit={this.props.handleSubmit}>
            <input
              type="text"
              value={this.props.draftCard.title}
              onChange={e => this.handleChange('title', e)}
              placeholder="Title"
              required
            />
            <textarea
              value={this.props.draftCard.description}
              onChange={e => this.handleChange('description', e)}
              placeholder="Description"
              required
            />
            <label htmlFor="status">
              Status
              <select
                id="status"
                value={this.props.draftCard.status}
                onChange={e => this.handleChange('status', e)}
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
                value={this.props.draftCard.color}
                onChange={e => this.handleChange('color', e)}
                type="color"
              />
            </label>
            <div className="actions">
              <button type="submit">{this.props.buttonLabel}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CardForm;
