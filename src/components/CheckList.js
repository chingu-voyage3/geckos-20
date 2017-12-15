import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CheckList extends Component {
  render() {
    console.log(this.props);
    const tasks = this.props.tasks.map(task => (
      <li className="checklist__task" key={task.id}>
        <input type="checkbox" defaultChecked={task.done} />
        {task.name}
        <a className="checklist__task--remove">&nbsp;</a>
      </li>
    ));
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input
          type="text"
          className="checklist--add-task"
          placeholder="Add new task"
        />
      </div>
    );
  }
}

CheckList.propTypes = {
  cardId: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
};
