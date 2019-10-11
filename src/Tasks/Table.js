import React, { Component } from 'react';
const uuidv4 = require('uuid/v4');
import TaskEntry from './Entry';
import Utils from '../Utils';
class TaskPanel extends Component {
  constructor(props) {
    super(props)
  }
  render() {
      let x = this.state, y = this.props
      return (
        <table className = "table">
          <thead>
            <tr>
              <th scope="col">Last Action</th>
              <th scope="col">Task Name</th>
              <th scope="col">Intervals</th>
              <th scope="col">
                <button type = "button" className = "btn btn-outline-primary"
                  onClick = {y.addNewTask}>New Entry</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {y.tasks.map(value => {
              return <TaskEntry title = {value} ikey = {value}
                key = {value} removeTask = {y.removeTask}/>
            })}
          </tbody>
        </table>
      )
   }
}; export default TaskPanel;
