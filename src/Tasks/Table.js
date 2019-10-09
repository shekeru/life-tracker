import React, { Component } from 'react';
import TaskRow from './Row';
const uuidv4 = require('uuid/v4');
class TaskTable extends Component {
  constructor(props) {
    super(props)
    let x = this.state = {
      task_ids: [],
      ikey: "tasks"
    }, data = localStorage.getItem(x.ikey);
    if (data)
      this.state = JSON.parse(data);
    this.removeRow =
      this.removeRow.bind(this)
    this.addNew =
      this.addNew.bind(this)
  }
  removeRow(event) {
    let evt = event.target
    let arr = this.state.task_ids
    localStorage.removeItem(evt.name)
    arr.splice(arr.indexOf(evt.name), 1)
    localStorage.setItem(this.state.ikey,
      JSON.stringify(this.state))
    this.setState({task_ids: arr})
  }
  addNew(event) {
    this.state.task_ids.push(uuidv4())
    localStorage.setItem(this.state.ikey,
      JSON.stringify(this.state))
    this.setState({task_ids:
      this.state.task_ids
    })
  }
  render() {
      let x = this.state
      return (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Task Name</th>
              <th scope="col">Intervals</th>
              <th scope="col">
                <button type = "button" class = "btn btn-primary"
                  onClick = {this.addNew}>New Entry</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {x.task_ids.map((value, idx) => {
              return <TaskRow title = {value} ikey = {value}
                removeRow = {this.removeRow}/>
            })}
          </tbody>
        </table>
      )
   }
}; export default TaskTable;
