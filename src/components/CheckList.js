import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toggleTask } from '../store/actions/taskActions';

/* eslint-disable jsx-a11y/no-static-element-interactions */
class CheckList extends Component {
  checkInputKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
      evt.target.value = '';
    }
  };
  render() {
    let tasks;
    if (this.props.tasks) {
      // console.log(this.props.tasks);
      const tasksArr = Object.values(this.props.tasks);
      tasks = tasksArr.map(task => (
        <li
          className="checklist__task"
          key={task.id}
          title={moment(task.createdAt).format('MMM Do, Y')}
        >
          <input
            type="checkbox"
            defaultChecked={task.done}
            onChange={() =>
              this.props.toggleTask(this.props.cardId, task.id, task.done)
            }
          />
          {task.name}
          <a
            className="checklist__task--remove"
            onClick={() =>
              this.props.taskCallbacks.delete(this.props.cardId, task.id)
            }
            onKeyDown={() =>
              this.props.taskCallbacks.delete(this.props.cardId, task.id)
            }
          >
            &nbsp;
          </a>
        </li>
      ));
    }
    return (
      <div className="checklist">
        {this.props.tasks && <ul>{tasks}</ul>}
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
    add: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  toggleTask: (cardId, taskId, taskStatus) =>
    dispatch(toggleTask(cardId, taskId, taskStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);
