import React, { Component } from 'react';
import TaskPanel from './Tasks/Table';
import ReactDOM from 'react-dom';
const uuidv4 = require('uuid/v4');
import Utils from './Utils';
class Application extends Component {
  constructor(props) {
    super(props)
    let x = this.state = {
      ikey: "root",
      tables: ["t1"],
      t_index: 0
    }
  }
  onFieldUpdate = (event) => {
    let x = this.state, evt = event.target
    this.setState({[evt.name]: x[evt.name] = evt.value})
  }
  newTaskTable = (event) => {
    let x = this.state; x.tables.push(uuidv4())
    localStorage.setItem(x.ikey, JSON.stringify(x))
    this.setState({tables: x.tables})
  }
  render() {
    let x = this.state
    return (
       <main>
          <button type = "button" className = "btn btn-primary"
            onClick = {this.onFieldUpdate} name = "t_index"
              value = "t1" >{x.tables.name}</button>
          <button type = "button" className = "btn btn-light"
            onClick = {this.newTaskTable}>+</button>
          <TaskPanel ikey = {x.tables[x.t_index]}/>
       </main>
    )
  }
}; export default Application;

ReactDOM.render(<Application/>,
  document.getElementById
    ('inject'));
