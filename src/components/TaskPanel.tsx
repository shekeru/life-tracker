import React from "react"
import * as Panels from '../store/Panels'

export function TaskPanel(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Last Action</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Intervals</th>
                    <th scope="col">
                        <button type="button" className="btn btn-outline-primary"
                            onClick = {() => {}}>New Entry</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.current?.entries.map((entry: Panels.Entry) => 
                    <TaskEntry title={entry.title} ikey={entry.ikey} 
                        last={entry.last} freq={entry.freq} />)}
            </tbody>
        </table>
    )
}

function TaskEntry(props) {
    return (
        <tr>
            <td>
                {/* <TimeAgo date={x.timestamp} className={(() => {
                    let diff = Date.now() - x.timestamp
                    let range = x.interval * x.units
                    if (diff > range * 0.95)
                        return "text-danger "
                            + "font-weight-bold"
                    if (diff > range * 0.75)
                        return "text-warning"
                })()} /> */}
            </td>
            <td>
                <input type="text" name="title" value={props.title}
                    onChange={this.onFieldUpdate} />
            </td>
            <td>
                <input type="number" name="interval"
                    value={props.interval} onChange={this.onFieldUpdate} />
                <select name="units" onChange={this.onFieldUpdate}
                    value={props.units}><option value={undefined}></option>
                    <option value="3600000">Hours</option>
                    <option value="86400000">Days</option>
                </select>
            </td>
            <td>
                <button type="button" className="btn btn-outline-success"
                    name="timestamp" onClick={() => {}} hidden={props.bDelete}
                    onContextMenu={this.onFlipClick}>Refresh</button>
                <button type="button" className="btn btn-danger"
                    name={props.ikey} onClick={() => {}} hidden={!props.bDelete}
                    onContextMenu={this.onFlipClick}>Delete</button>
            </td>
        </tr>
    )
}