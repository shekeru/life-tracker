import React, { Component } from 'react';
const uuidv4 = require('uuid/v4');
import TaskEntry from './Entry';
import Utils from '../Utils';
class TaskPanel extends Component {
  constructor(props) {
    super(props)
    let x = this.state = {
      ikey: props.ikey,
      name: 'default',
      task_ids: []
    }; Utils.load_obj(x);
  }
  toRemove = (event) => {
    let evt = event.target
    let x = this.state, tasks = x.task_ids
    tasks.splice(tasks.indexOf(evt.name), 1)
    localStorage.setItem(x.ikey, JSON.stringify(x))
      this.setState({task_ids: tasks})
    localStorage.removeItem(evt.name)
  }
  toAddNew = (event) => {
    let x = this.state; x.task_ids.push(uuidv4())
    localStorage.setItem(x.ikey, JSON.stringify(x))
    this.setState({task_ids: x.task_ids})
  }
  render() {
      let x = this.state
      return (
        <table className = "table">
          <thead>
            <tr>
              <th scope="col">Last Action</th>
              <th scope="col">Task Name</th>
              <th scope="col">Intervals</th>
              <th scope="col">
                <button type = "button" className = "btn btn-primary"
                  onClick = {this.toAddNew}>New Entry</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {x.task_ids.map(value => {
              return <TaskEntry title = {value} ikey = {value}
                key = {value} toRemove = {this.toRemove}/>
            })}
          </tbody>
        </table>
      )
   }
}; export default TaskPanel;
