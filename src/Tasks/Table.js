import React, { Component } from 'react';
const uuidv4 = require('uuid/v4');
import TaskEntry from './Entry';
import Utils from '../Utils';
class TaskPanel extends Component {
  constructor(props) {
    super(props)
    let x = this.state = {
      jkey: props.jkey,
      task_ids: {},
      ikey: "tasks"
    }; Utils.load_obj(x);
  }
  toRemove = (event) => {
    let evt = event.target
    let x = this.state, tasks = x.task_ids
    tasks[x.jkey].splice(tasks[x.jkey].indexOf(evt.name), 1)
    localStorage.setItem(x.ikey, JSON.stringify(x))
    this.setState({task_ids: tasks})
    localStorage.removeItem(evt.name)
  }
  toAddNew = (event) => {
    let x = this.state, tasks = x.task_ids
    tasks[x.jkey].push(uuidv4())
    localStorage.setItem(x.ikey, JSON.stringify(x))
    this.setState({task_ids: tasks})
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
            {x.task_ids[x.jkey].map(value => {
              return <TaskEntry title = {value} ikey = {value}
                key = {value} toRemove = {this.toRemove}/>
            })}
          </tbody>
        </table>
      )
   }
}; export default TaskPanel;
