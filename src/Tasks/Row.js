import React, { Component } from "react";
import ReactDOM from "react-dom";
import TimeAgo from 'react-timeago'
class TaskRow extends Component {
  constructor(props) {
    super(props)
    let x = this.state = {
          title: "",
          ikey: props.ikey,
          timestamp: 1000,
          interval: 0,
          units: ""
    }, data = localStorage.getItem(x.ikey);
    if (data)
      this.state = JSON.parse(data)
    this.onChange =
        this.onChange.bind(this)
    this.onClick =
        this.onClick.bind(this)
  }
  onChange(event) {
    let x = this.state, evt = event.target
    this.setState({[evt.name]: x[evt.name] = evt.value})
    localStorage.setItem(x.ikey, JSON.stringify(x))
  }
  onClick(event) {
    let x = this.state, evt = event.target
    this.setState({[evt.name]: x[evt.name] = Date.now()})
    localStorage.setItem(x.ikey, JSON.stringify(x))
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
            onChange = {this.onChange}/>
        </td>
        <td>
          <input type = "number" name = "interval"
            value = {x.interval} onChange = {this.onChange}/>
          <select name = "units" onChange = {this.onChange} value = {x.units}>
            <option selected value></option>
            <option value = "3600000">Hours</option>
            <option value = "86400000">Days</option>
          </select>
        </td>
        <td>
          <button type = "button" class = "btn btn-outline-success"
            name = "timestamp" onClick = {this.onClick}>Refresh</button>
        </td>
      </tr>
    )
  }
}; export default TaskRow;
