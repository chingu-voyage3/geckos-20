import React, { Component } from 'react';

class CheckList extends Component {
  render() {
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
      </div>
    );
  }
}

export default CheckList;
