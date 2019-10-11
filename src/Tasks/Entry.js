import React, { Component } from "react";
import ReactDOM from "react-dom";
import TimeAgo from 'react-timeago'
import Utils from '../Utils';
class TaskEntry extends Component {
  constructor(props) {
    super(props)
    let x = this.state = {
          title: "",
          ikey: props.ikey,
          bDelete: false,
          timestamp: 0,
          interval: 0,
          units: ""
    }, data = localStorage.getItem(x.ikey);
    if (data)
      this.state = JSON.parse(data)
  } // Function Defs
  onFieldUpdate = (event) => {
    let x = this.state, evt = event.target
    this.setState({[evt.name]: x[evt.name] = evt.value})
    localStorage.setItem(x.ikey, JSON.stringify(x))
  }
  onUpdateTime = (event) => {
    let x = this.state, evt = event.target
    this.setState({[evt.name]: x[evt.name] = Date.now()})
    localStorage.setItem(x.ikey, JSON.stringify(x))
  }
  onFlipClick = (event) => {
    let x = this.state, evt = event.target
    this.setState({bDelete: !x.bDelete})
    event.preventDefault();
    console.log(x.bDelete, !x.bDelete);
  }
  render() {
    let x = this.state
    return (
      <tr>
        <td>
          <TimeAgo date = {x.timestamp}/>
        </td>
        <td>
          <input type = "text" name = "title" value = {x.title}
            onChange = {this.onFieldUpdate}/>
        </td>
        <td>
          <input type = "number" name = "interval"
            value = {x.interval} onChange = {this.onFieldUpdate}/>
          <select name = "units" onChange = {this.onFieldUpdate}
            value = {x.units}><option value></option>
            <option value = "3600000">Hours</option>
            <option value = "86400000">Days</option>
          </select>
        </td>
        <td>
          <button type = "button" className = "btn btn-outline-success"
            name = "timestamp" onClick = {this.onUpdateTime} hidden={x.bDelete}
            onContextMenu={this.onFlipClick}>Refresh</button>
          <button type = "button" className = "btn btn-danger"
            name = {x.ikey} onClick = {this.props.toRemove} hidden={!x.bDelete}
            onContextMenu={this.onFlipClick}>Delete</button>
        </td>
      </tr>
    )
  }
}; export default TaskEntry;
