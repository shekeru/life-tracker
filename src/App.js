import React, { Component } from 'react';
import TaskPanel from './Tasks/Table';
import ReactDOM from 'react-dom';
const uuidv4 = require('uuid/v4');
import Utils from './Utils';
class Application extends Component {
  constructor(props) {
    super(props)
    let x = this.state = {
      ikey: "@app",
      tables: [],
      active: 0
    }; Utils.load_obj(x)
      x.active = 0
  }
  // Table Management
  newTaskTable = (event) => {
    let x = this.state; x.tables.push({
        name: "default",
        ikey: uuidv4(),
        ids: []
    }); this.setState({tables: x.tables},
      Utils.save_obj(this))
  }
  onFieldUpdate = (event) => {
    let x = this.state, evt = event.target
    this.setState({[evt.name]: x[evt.name] = evt.value})
  }
  // Task Management
  removeTask = (event) => {
    let x = this.state, evt = event.target,
      table = x.tables[x.active]
    table.ids.splice(table.ids.indexOf(evt.name), 1)
    // Save State
    this.setState({tables: x.tables},
        Utils.save_obj(this))
    Utils.rm_obj(evt.name)
  }
  addNewTask = (event) => {
    let x = this.state
    x.tables[x.active].ids.push(uuidv4())
    this.setState({tables: x.tables},
      Utils.save_obj(this))
  }
  render() {
    let x = this.state
    return (
       <main>
         <div class="btn-group">
           {x.tables.map((val, idx) => {
             return <button type = "button" name = "active" value = {idx}
              className = {"btn btn-outline-info"+(x.active == idx ? " active" :"")}
                onClick = {this.onFieldUpdate} key = {val.ikey}>{val.name}</button>
           })}
          </div>
          <button className = "btn btn-light" type = "button"
            onClick = {this.newTaskTable}>+</button>
          <TaskPanel tasks = {x.tables[x.active].ids} addNewTask = {this.addNewTask}
            removeTask = {this.removeTask}/>
       </main>
    )
  }
}; export default Application;

ReactDOM.render(<Application/>,
  document.getElementById
    ('inject'));
