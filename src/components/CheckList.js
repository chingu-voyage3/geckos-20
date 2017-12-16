import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/no-static-element-interactions */
export default class CheckList extends Component {
  checkInputKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
      evt.target.value = '';
    }
  };
  render() {
    console.log(this.props);
    const tasks = this.props.tasks.map((task, taskIndex) => (
      <li className="checklist__task" key={task.id}>
        <input
          type="checkbox"
          defaultChecked={task.done}
          onChange={() =>
            this.props.taskCallbacks.toggle(
              this.props.cardId,
              task.id,
              taskIndex,
            )
          }
        />
        {task.name}
        <a
          className="checklist__task--remove"
          onClick={() =>
            this.props.taskCallbacks.delete(
              this.props.cardId,
              task.id,
              taskIndex,
            )
          }
          onKeyDown={() =>
            this.props.taskCallbacks.delete(
              this.props.cardId,
              task.id,
              taskIndex,
            )
          }
        >
          &nbsp;
        </a>
      </li>
    ));
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input
          type="text"
          className="checklist--add-task"
          placeholder="Add new task"
          onKeyPress={this.checkInputKeyPress}
        />
      </div>
    );
  }
}

CheckList.propTypes = {
  cardId: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.shape({
    toggle: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
  }).isRequired,
};
