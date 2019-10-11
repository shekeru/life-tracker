import React, { Component } from 'react';
import TaskPanel from './Tasks/Table';
import ReactDOM from 'react-dom';
import Utils from './Utils';
class Application extends Component {
  constructor(props) {
    super(props)
    let x = this.state = {
      task_key: "t1"
    };
  }
  onFieldUpdate = (event) => {
    let x = this.state, evt = event.target
    this.setState({[evt.name]: x[evt.name] = evt.value})
    console.log(evt)
  }
  render() {
    let x = this.state
    return (
       <main>
          <button type = "button" className = "btn btn-primary"
            onClick = {this.onFieldUpdate} name = "task_key"
              value = "t1" >Survival</button>
          <button type = "button" className = "btn btn-primary"
            onClick = {this.onFieldUpdate} name = "task_key"
              value = "t2" >Grooming</button>
          <button type = "button" className = "btn btn-primary"
            onClick = {this.onFieldUpdate} name = "task_key"
              value = "t3" >Enrichment</button>
          <TaskPanel jkey = {x.task_key}/>
       </main>
    )
  }
}; export default Application;

ReactDOM.render(<Application/>,
  document.getElementById
    ('inject'));
